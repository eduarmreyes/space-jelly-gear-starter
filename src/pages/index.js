import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";

import products from "@data/products";

import styles from "@styles/Page.module.scss";

export default function Home({ page, products }) {
  const { heroTitle, heroText, heroLink, heroBackground } = page;

  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <Image
                className={styles.heroImage}
                src={heroBackground.url}
                alt="Two people showing off the shirt and hat apparel."
                layout="responsive"
                height={heroBackground.height}
                width={heroBackground.width}
                priority={true}
              />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map((product) => {
            const userLanguage = navigator.language || navigator.userLanguage;

            const productPrice = new Intl.NumberFormat(userLanguage, {
              style: "currency",
              currency: "usd",
            }).format(product.price);

            return (
              <li key={product.slug}>
                <Link href="#">
                  <a>
                    <div className={styles.productImage}>
                      <Image
                        width={product.image.width}
                        height={product.image.height}
                        src={product.image.url}
                        alt={`${product.name} showing on a product card.`}
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>{productPrice}</p>
                  </a>
                </Link>
                <p>
                  <Button>Add to Cart</Button>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
    cache: new InMemoryCache(),
  });

  let data;

  await client
    .query({
      query: gql`
        query homePage {
          page(where: { slug: "home" }) {
            id
            heroLink
            heroText
            heroTitle
            heroBackground {
              fileName
              size
              stage
              url
              width
              height
            }
          }
          products(first: 4) {
            name
            price
            slug
            image {
              height
              url
              width
              size
            }
          }
        }
      `,
    })
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      throw error;
    });

  const { page, products } = data;

  // console.log("Fetched products:", JSON.stringify(products, null, 2));

  return {
    props: { page, products },
  };
}
