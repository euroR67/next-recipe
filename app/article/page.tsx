import prisma from "@/lib/db";
import Link from 'next/link';

const ArticlePage = async () => {
    const articles = await prisma.article.findMany();

    return (
        <div className="article-wrapper">
            <h1>Blog</h1>
            {articles.map((article) => (
                <div className="article" key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{new Date(article.updatedAt).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false })}</p>
                    <p>{article.description}</p>
                    <Link href={`/article/${article.id}`} className="read-more">
                        Read more
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ArticlePage;