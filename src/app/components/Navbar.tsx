"use client";

import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { LuShoppingCart } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TbArrowsSort } from 'react-icons/tb'

type SortOption = 'recent' | 'title' | 'author'
type ViewMode = 'grid' | 'list'

interface NavbarProps {
  searchQuery?: string
  onSearchChange?: (value: string) => void
  sortBy?: SortOption
  onSortChange?: (value: SortOption) => void
  viewMode?: ViewMode
  onViewChange?: (value: ViewMode) => void
  onFilterToggle?: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewChange,
  onFilterToggle,
}) => {
  const [internalSearch, setInternalSearch] = useState('')
  const [internalSort, setInternalSort] = useState<SortOption>('recent')
  const [internalView, setInternalView] = useState<ViewMode>('grid')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showViewMenu, setShowViewMenu] = useState(false)

  const activeSort = sortBy ?? internalSort
  const activeView = viewMode ?? internalView
  const searchValue = searchQuery ?? internalSearch

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setInternalSearch(value)
    }
  }

  const handleSortChange = (value: SortOption) => {
    if (onSortChange) {
      onSortChange(value)
    } else {
      setInternalSort(value)
    }
    setShowSortMenu(false)
  }

  const handleViewChange = (value: ViewMode) => {
    if (onViewChange) {
      onViewChange(value)
    } else {
      setInternalView(value)
    }
    setShowViewMenu(false)
  }

  const sortLabel =
    activeSort === 'recent'
      ? 'Recent'
      : activeSort === 'title'
      ? 'Title (A–Z)'
      : 'Author (A–Z)'

  const viewLabel = activeView === 'grid' ? 'Grid' : 'List'

  return (
    <nav className={styles.navbar}>
        <div className={styles.left}>
            <span className={styles.logo}>kindle</span>
            <div className={styles.searchBox}>
                <IoSearchOutline className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
            </div>
        </div>

        <div className={styles.right}>
            <div
              className={styles.menuItem}
              onClick={onFilterToggle}
            >
                <LuSettings2 className={styles.filterIcon} />
                <span className={styles.menuText}>Filter</span>
            </div>

            <div
              className={styles.menuItem}
              onClick={() => setShowSortMenu((prev) => !prev)}
            >
              <TbArrowsSort className={styles.sortIcon} />
              <span className={styles.menuText}>Sort by: {sortLabel}</span>
              {showSortMenu && (
                <div className={styles.dropdown}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleSortChange('recent')}
                  >
                    Recent (default)
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleSortChange('title')}
                  >
                    Title (A–Z)
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleSortChange('author')}
                  >
                    Author (A–Z)
                  </button>
                </div>
              )}
            </div>

            <div
              className={styles.menuItem}
              onClick={() => setShowViewMenu((prev) => !prev)}
            >
              <BsFillGrid3X3GapFill className={styles.viewIcon} />
              <span className={styles.menuText}>View: {viewLabel}</span>
              {showViewMenu && (
                <div className={styles.dropdown}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleViewChange('grid')}
                  >
                    Grid view
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleViewChange('list')}
                  >
                    List view
                  </button>
                </div>
              )}
            </div>

            <div className={styles.menuItem}>
                <LuShoppingCart className={styles.cartIcon} />
            </div>

            <div className={styles.menuItem}>
                <BsThreeDotsVertical className={styles.moreIcon} />
            </div>
        </div>
    </nav>
  )
}

export default Navbar