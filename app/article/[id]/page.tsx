import prisma from "@/lib/db";

interface Params {
    id: string;
}

export default async function ArticleDetail({ params }: { params: Promise<Params> }) {
    const { id } = await params;
    const article = await prisma.article.findUnique({
        where: {
            id,
        },
    });

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <main className="article-detail">
            <h1>{article.title}</h1>
            <p>{new Date(article.updatedAt).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false })}</p>
            <p>{article.description}</p>
        </main>
    );
}