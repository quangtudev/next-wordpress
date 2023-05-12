import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';
import ClassName from 'models/classname';

import { FaMapPin } from 'react-icons/fa';
import styles from './Metadata.module.scss';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

const Metadata = ({ className, author, date, categories, options = DEFAULT_METADATA_OPTIONS, isSticky = false }) => {
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  const { compactCategories } = options;

  return (
    <div>
      <ul className={metadataClassName.toString()}>
        {author && (
          <li className={styles.metadataAuthor}>
            <address>
              {author.avatar && (
                <img
                  width={author.avatar.width}
                  height={author.avatar.height}
                  src={author.avatar.url}
                  alt="Author Avatar"
                />
              )}
              By{' '}
              <Link legacyBehavior href={authorPathByName(author.name)}>
                <a className={styles.authorName} rel="author">
                  {author.name}
                </a>
              </Link>
            </address>
          </li>
        )}
        {date && (
          <li>
            <time pubdate="pubdate" dateTime={date}>
              {formatDate(date)}
            </time>
          </li>
        )}
        {isSticky && (
          <li className={styles.metadataSticky}>
            <FaMapPin aria-label="Sticky Post" />
          </li>
        )}
      </ul>
      <ul className={metadataClassName.toString()}>
        {Array.isArray(categories) && categories[0] && (
          <li className={styles.metadataCategories}>
            {compactCategories && (
              <p title={categories.map(({ name }) => name).join(', ')}>
                <Link legacyBehavior href={categoryPathBySlug(categories[0].slug)}>
                  <a>{categories[0].name}</a>
                </Link>
                {categories.length > 1 && ' and more'}
              </p>
            )}
            {!compactCategories && (
              <ul>
                {categories.map((category) => {
                  return (
                    <li key={category.slug}>
                      <Link legacyBehavior href={categoryPathBySlug(category.slug)}>
                        <a>{category.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Metadata;
