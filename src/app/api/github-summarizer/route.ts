import { NextRequest, NextResponse } from "next/server";
import { getApiKeyData, incrementApiKeyUsage } from "../../lib/apiKeyUtils";
import { getGithubRepoInfo } from "../../lib/githubUtils";

export async function POST(req: NextRequest) {
    try {
        const { githubUrl } = await req.json();
        const apiKey = req.headers.get("x-api-key");

        if (!apiKey) {
            return NextResponse.json({ success: false, error: "API key is required" }, {
                status: 400
            });
        }

        // Get API key data and validate
        const result = await getApiKeyData(apiKey);

        if (!result.valid || !result.data) {
            return NextResponse.json({ success: false, error: result.error || "Invalid API key" }, {
                status: 400
            });
        }

        // Increment usage
        const usageResult = await incrementApiKeyUsage(result.data);

        if (!usageResult.success) {
            return NextResponse.json({ success: false, error: usageResult.error }, {
                status: 400
            });
        }

        // Get GitHub repo information
        const repoInfo = await getGithubRepoInfo(githubUrl);

        return repoInfo;

    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ 
            success: false, 
            error: err instanceof Error ? err.message : "An unknown error occurred" 
        }, { status: 500 });
    }
}
