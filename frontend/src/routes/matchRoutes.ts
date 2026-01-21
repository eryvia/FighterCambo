    type CompareReq = { a: string; b: string };
    type CompareRes = { winner: string; debug: { a: string; b: string } };

    export async function compare(req: CompareReq): Promise<CompareRes> {
        const res = await fetch("/api/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }