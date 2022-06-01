import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME

    const response = await fetch(server+"/posts");
    const posts: any[] = await response.json();

    

    const fields : ISitemapField[] = posts.map(post => ({
        loc: hostname+`/b/${post.community}/comments/${post._id}`,
        lastmod: new Date().toISOString(),
}));

    

    return getServerSideSitemap(ctx, fields)
}


export default function Site() {}