import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { scores, likelihoods, topCondition } = await request.json();

    if (!scores || !likelihoods || !topCondition) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate a mental health screening advice write-up for a web app using validated tools (PHQ-9, GAD-7, ASRS, AQ-10). The app displays:
      - Condition Scores and Likelihoods: ${Object.entries(scores)
        .map(([c, s]) => {
          const maxScores = {
            ADHD: 24,
            Autism: 10,
            Anxiety: 21,
            Depression: 27,
          };
          return `${c}: ${s}/${maxScores[c]} (${likelihoods[c]})`;
        })
        .join(", ")}
      - Top Condition: ${topCondition} (Score: ${
      scores[topCondition]
    }, Likelihood: ${likelihoods[topCondition]})

      Return a JSON object with two fields:
      - "topConditionExplanation": A concise explanation (75-100 words) of ${topCondition} (score: ${
      scores[topCondition]
    }, likelihood: ${
      likelihoods[topCondition]
    }). Describe its key characteristics in a supportive, empathetic tone (e.g., for Depression: "You may feel persistent sadness or low energy..."). Emphasize this is not a diagnosis and professional evaluation is needed. Avoid mentioning other conditions.
      - "conditionAdvice": A concise write-up (100-125 words) with actionable advice for managing ${topCondition}. Include specific coping strategies (e.g., mindfulness, journaling, routine-building) and recommend seeking professional help (e.g., therapists, support groups). Use a positive, encouraging tone. Avoid mentioning other conditions.

      CRITICAL CONSTRAINTS:
      - "topConditionExplanation" must only describe ${topCondition} and its traits.
      - "conditionAdvice" must only provide advice for ${topCondition}.
      - Total length: 175-225 words, formatted as valid JSON.
      - Align with the app’s UI, emphasizing informational purpose and the need for professional diagnosis.
      - Use non-diagnostic language (e.g., "may indicate", "suggests").
      - Ensure advice is evidence-based and appropriate for a general audience.
    `;

    let advice = null;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts && !advice) {
      attempts++;
      console.log(`Attempt ${attempts} to fetch valid LLM response`);

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();

      if (responseText.startsWith("```json") && responseText.endsWith("```")) {
        responseText = responseText.slice(7, -3).trim();
      } else if (
        responseText.startsWith("```") &&
        responseText.endsWith("```")
      ) {
        responseText = responseText.slice(3, -3).trim();
      }

      const startIndex = responseText.indexOf("{");
      const endIndex = responseText.lastIndexOf("}");
      if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        console.error(`Attempt ${attempts}: No valid JSON object found`);
        continue;
      }

      const jsonString = responseText.slice(startIndex, endIndex + 1).trim();

      let parsedAdvice;
      try {
        parsedAdvice = JSON.parse(jsonString);
      } catch (parseError) {
        console.error(`Attempt ${attempts}: Error parsing JSON:`, parseError);
        continue;
      }

      if (
        !parsedAdvice.topConditionExplanation ||
        !parsedAdvice.conditionAdvice
      ) {
        console.error(`Attempt ${attempts}: Incomplete response from AI`);
        continue;
      }

      const otherConditions = ["ADHD", "Autism", "Anxiety", "Depression"]
        .filter((c) => c !== topCondition)
        .map((c) => c.toLowerCase());
      const explanationText =
        parsedAdvice.topConditionExplanation.toLowerCase();
      const adviceText = parsedAdvice.conditionAdvice.toLowerCase();

      if (
        otherConditions.some(
          (c) => explanationText.includes(c) || adviceText.includes(c)
        )
      ) {
        console.error(
          `Attempt ${attempts}: Response includes other conditions`
        );
        continue;
      }

      advice = parsedAdvice;
    }

    if (!advice) {
      return NextResponse.json(
        { error: "Failed to generate valid advice after multiple attempts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ advice }, { status: 200 });
  } catch (error) {
    console.error("Error generating advice:", error);
    return NextResponse.json(
      { error: "Failed to generate condition advice" },
      { status: 500 }
    );
  }
}
