import React, { useState } from 'react'
import { packageItemsData, tags } from '../content/packageItemsData';
import PackageItem from './PackageItem';
import styles from '../styles/PackageSearch.module.css';

const PackagesSearch = () => {

  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedfilter] = useState("All");
  const [shownPackages, setShownPackages] = useState(packageItemsData);
  const [filterTags, setFilterTags] = useState(tags);

  const searchValueChanged = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    let packagesAfterFilter = packageItemsData;
    if (selectedFilter !== "All") {
      packagesAfterFilter = packageItemsData.filter(item => {
        return item.categories.includes(selectedFilter);
      })
    }

    const packagesAfterSearch = packagesAfterFilter.filter(item => {
      const allCapsName = item.name.toUpperCase();
      return allCapsName.includes(value.toUpperCase());
    })

    console.log(packagesAfterSearch)
    setShownPackages(packagesAfterSearch);
  }

  const tagClicked = (tag) => {
    console.log(tag)

    setSelectedfilter(tag);

    let packagesAfterFilter = packageItemsData;

    if (tag !== "All") {
      packagesAfterFilter = packageItemsData.filter(item => {
        return item.categories.includes(tag);
      })
    }

    const packagesAfterSearch = packagesAfterFilter.filter(item => {
      const allCapsName = item.name.toUpperCase();
      return allCapsName.includes(searchValue.toUpperCase());
    })

    console.log(packagesAfterSearch)
    setShownPackages(packagesAfterSearch);
  }

  return (
    <div className={styles.mainContent}>
      <input type="text" className={styles.searchInput} placeholder="Search..." onChange={(e) => searchValueChanged(e)} />
      <ul className={styles.tagList}>
        {
          filterTags.map(tag => {
            return (
              <li key={tag}>
                <button className={`${styles.tag} ${tag === selectedFilter ? styles.selectedTag : undefined}`} onClick={() => tagClicked(tag)}>{tag}</button>
              </li>
            )
          })
        }
      </ul>
      <ul className={styles.list}>
        {
          shownPackages.map((item) => {
            return (
              <li key={item.id}>
                <PackageItem data={item} />
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export default PackagesSearch