import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { title, featuredImage, excerpt, slug, date, author, categories, isSticky = false } = post;
  const { excludeMetadata = [] } = options;
  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  if (!excludeMetadata.includes('featuredImage')) {
    metadata.featuredImage = featuredImage;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      <Link href={postPathBySlug(slug)}>
        <a>
          {isSticky && <FaMapPin aria-label="Sticky Post" />}
          {metadata.featuredImage && (
            <FeaturedImage
              {...metadata.featuredImage}
              src={metadata.featuredImage.sourceUrl}
              dangerouslySetInnerHTML={metadata.featuredImage.caption}
            />
          )}
        </a>
      </Link>
      <Link href={postPathBySlug(slug)}>
        <a>
          <h3
            className={styles.postCardTitle}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </a>
      </Link>
      {excerpt && (
        <div
          className={styles.postCardContent}
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
      <Metadata className={styles.postCardMetadata} {...metadata} />
    </div>
  );
};

export default PostCard;
