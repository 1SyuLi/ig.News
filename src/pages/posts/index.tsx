import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';


export default function Posts() {


    return (
        <>
            <Head>
                <title>Posts | ig.news</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Mapas com React usando Leaflet</strong>
                        <p>Neste post vamos desenvolver uma página web para demonstrar, na prática, a integração de Mapas em uma aplicação com React usando Leaflet.</p>
                    </a>

                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Mapas com React usando Leaflet</strong>
                        <p>Neste post vamos desenvolver uma página web para demonstrar, na prática, a integração de Mapas em uma aplicação com React usando Leaflet.</p>
                    </a>

                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Mapas com React usando Leaflet</strong>
                        <p>Neste post vamos desenvolver uma página web para demonstrar, na prática, a integração de Mapas em uma aplicação com React usando Leaflet.</p>
                    </a>
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['publication.type', 'post.content'],
        pageSize: 100,
    })


    console.log(JSON.stringify(response, null, 2));

    return {
        props: {}
    }
}