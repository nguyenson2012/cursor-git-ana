import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

interface SummaryResult {
    success: boolean;
    summary?: any;
    error?: string;
}

// Define the structure of the summary output
const summarySchema = z.object({
    mainPurpose: z.string().describe("The main purpose and key features of the repository"),
    technologies: z.array(z.string()).describe("List of key technologies used in the project"),
    setupInstructions: z.string().describe("Important setup and installation requirements"),
    notableFeatures: z.array(z.string()).describe("List of notable features or capabilities")
});

export async function summarizeReadme(readmeContent: string): Promise<SummaryResult> {
    if (!process.env.GOOGLE_API_KEY) {
        return { success: false, error: "Google API key not configured" };
    }

    try {
        // Initialize the model
        const llm = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-pro",
            temperature: 0,
            maxRetries: 2
        }).withStructuredOutput(summarySchema);

        // Create a prompt template
        const template = `Analyze and provide a structured summary of the following GitHub repository README content:

        README Content:
        {readme}

        Provide a structured summary following the schema format.`;

        const promptTemplate = ChatPromptTemplate.fromTemplate(template);

        // Create a chain
        const chain = RunnableSequence.from([
            promptTemplate,
            llm
        ]);

        // Run the chain
        const result = await chain.invoke({
            readme: readmeContent
        });

        return {
            success: true,
            summary: result
        };

    } catch (error) {
        console.error('Error in summarization:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred during summarization'
        };
    }
}