import { summarizeReadme } from "./summarizeUtil";
import { NextResponse } from "next/server";

interface RepoInfo {
    summary: string | undefined;
    stars: number;
}

export async function getGithubRepoInfo(githubUrl: string) {
    try {
        // Extract owner and repo from GitHub URL
        const urlParts = githubUrl.replace('https://github.com/', '').split('/');
        if (urlParts.length < 2) {
            return NextResponse.json({
                success: false,
                error: "Invalid GitHub URL format"
            }, { status: 400 });
        }
        const [owner, repo] = urlParts;

        // Fetch repository data including stars
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!repoResponse.ok) {
            return NextResponse.json({
                success: false,
                error: "Failed to fetch repository information"
            }, { status: 400 });
        }
        const repoData = await repoResponse.json();

        // Fetch README content
        const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        if (!readmeResponse.ok) {
            return NextResponse.json({
                success: false,
                error: "Failed to fetch README"
            }, { status: 400 });
        }
        const readmeData = await readmeResponse.json();

        // Decode README content from base64
        const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        const summary = await summarizeReadme(readmeContent);

        if (!summary.success) {
            return NextResponse.json({
                success: false,
                error: summary.error
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            data: {
                ...summary,
                stars: repoData.stargazers_count
            }
        }, { status: 200 });
    } catch (err) {
        console.error("Error fetching repository data:", err);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch repository data"
        }, { status: 500 });
    }
}