import { summarizeReadme } from "./summarizeUtil";

interface RepoInfo {
    summary: string | undefined;
    stars: number;
}

export async function getGithubRepoInfo(githubUrl: string): Promise<{ success: boolean; data?: RepoInfo; error?: string }> {
    try {
        // Extract owner and repo from GitHub URL
        const urlParts = githubUrl.replace('https://github.com/', '').split('/');
        if (urlParts.length < 2) {
            return { success: false, error: "Invalid GitHub URL format" };
        }
        const [owner, repo] = urlParts;

        // Fetch repository data including stars
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!repoResponse.ok) {
            return { success: false, error: "Failed to fetch repository information" };
        }
        const repoData = await repoResponse.json();

        // Fetch README content
        const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        if (!readmeResponse.ok) {
            return { success: false, error: "Failed to fetch README" };
        }
        const readmeData = await readmeResponse.json();
        
        // Decode README content from base64
        const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        const summary = await summarizeReadme(readmeContent);

        return {
            success: true,
            data: {
                summary: summary.summary,
                stars: repoData.stargazers_count
            }
        };
    } catch (err) {
        return { success: false, error: "Failed to fetch repository data" };
    }
}