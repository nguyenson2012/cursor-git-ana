import { NextRequest, NextResponse } from "next/server";
import { getApiKeyData, incrementApiKeyUsage } from "../../lib/apiKeyUtils";
import { getGithubRepoInfo } from "../../lib/githubUtils";

export async function POST(req: NextRequest) {
    try {
        console.log("POST request received");
        const { githubUrl } = await req.json();
        console.log(githubUrl);
        const apiKey = req.headers.get("x-api-key");

        if (!apiKey) {
            return NextResponse.json({ valid: false, error: "API key is required" }, {
                status: 400
            });
        }

        // Get API key data and validate
        const result = await getApiKeyData(apiKey);

        if (!result.valid || !result.data) {
            return NextResponse.json({ valid: false, error: result.error || "Invalid API key" }, {
                status: 400
            });
        }

        // Increment usage
        const usageResult = await incrementApiKeyUsage(result.data);

        if (!usageResult.success) {
            return NextResponse.json({ valid: false, error: usageResult.error }, {
                status: 400
            });
        }

        // Get GitHub repo information
        const repoInfo = await getGithubRepoInfo(githubUrl);

        if (!repoInfo.success || !repoInfo.data) {
            return NextResponse.json({ valid: false, error: repoInfo.error || "Failed to fetch repository data" }, {
                status: 400
            });
        }

        return NextResponse.json({
            valid: true,
            data: {
                repoInfo: repoInfo.data
            }
        }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json({ valid: false, error: err }, { status: 500 });
    }
}
