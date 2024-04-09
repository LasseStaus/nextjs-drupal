import type { ReactElement } from 'react';

import { Layout } from '@/components/layout';
import { NodeArticleTeaser } from '@/components/node--article--teaser';
import { drupal } from 'lib/drupal';
import { DrupalNode } from 'next-drupal';
import Head from 'next/head';
import type { NextPageWithLayout } from './_app';

interface IndexPageProps {
  nodes: DrupalNode[];
}

const IndexPage: NextPageWithLayout<IndexPageProps> = ({ nodes }) => {
  return (
    <>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(
  context
): Promise<{ props: IndexPageProps }> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--article',
    context,
    {
      params: {
        'filter[status]': 1,
        'fields[node--article]': 'title,path,field_image,uid,created',
        include: 'field_image,uid',
        sort: '-created',
      },
    }
  );

  return {
    props: {
      nodes,
    },
  };
}

export default IndexPage;
