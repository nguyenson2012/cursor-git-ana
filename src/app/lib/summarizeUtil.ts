import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

interface SummaryResult {
    success: boolean;
    summary?: string;
    error?: string;
}

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
        });

        // Create a prompt template
        const template = `Analyze and summarize the following GitHub repository README content. Focus on:
        1. Main purpose and features
        2. Key technologies used
        3. Important setup instructions or requirements
        4. Notable features or capabilities

        README Content:
        {readme}

        Provide a clear and concise summary.`;

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
            summary: result.text
        };

    } catch (error) {
        console.error('Error in summarization:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred during summarization'
        };
    }
}