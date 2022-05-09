import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";

import products from "@data/products";

import styles from "@styles/Page.module.scss";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href="#">
            <a>
              <div className={styles.heroContent}>
                <h2>Prepare for liftoff.</h2>
                <p>Apparel that&apos;s out of this world!</p>
              </div>
              <Image
                className={styles.heroImage}
                src="/images/space-jelly-gear-banner.jpg"
                alt="Two people showing off the shirt and hat apparel."
                layout="responsive"
                height={272}
                width={800}
              />
              {/* <img
                className={styles.heroImage}
                src="/images/space-jelly-gear-banner.jpg"
                alt=""
              /> */}
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.slice(0, 4).map((product) => {
            return (
              <li key={product.id}>
                <Link href="#">
                  <a>
                    <div className={styles.productImage}>
                      <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={`${product.name} showing on a product card.`}
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
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
