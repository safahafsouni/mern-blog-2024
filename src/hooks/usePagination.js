import { useMemo } from 'react';

// Constant for ellipsis
export const DOTS = '...';

// Custom hook for pagination
export const usePagination = ({
  siblingCount = 1, // Number of siblings to show on either side of the current page
  currentPage, // The currently active page
  totalPageCount, // Total number of pages available
}) => {
  // Memoize the pagination range to optimize performance
  const paginationRange = useMemo(() => {
    // **Total Page Numbers**: Calculate how many pages we want to display
    const totalPageNumbers = siblingCount + 5; // 2 siblings + 1 current + 2 dots + 1 last page

    // **State 1**: Check if total pages are less than or equal to total pages we can show
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount); // Show all pages directly
    }

    // Calculate left and right sibling indices
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1); // Prevents going below 1
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    ); // Prevents going above total pages

    // **Visual Representation**
    // Current Page: 4, Sibling Count: 1, Total Pages: 6
    // Range: [1, 2, 3, 4, 5, 6]
    // Left Index: 3 (4 - 1)
    // Right Index: 5 (4 + 1)

    // Determine whether to show dots
    const shouldShowLeftDots = leftSiblingIndex > 2; // Checks if we need to show dots on the left
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2; // Checks if we need to show dots on the right

    const firstPageIndex = 1; // The first page index
    const lastPageIndex = totalPageCount; // The last page index

    // **State 2**: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Calculate how many items to show on the left
      let leftItemCount = 3 + 2 * siblingCount; // 3 fixed pages + 2 siblings
      let leftRange = range(1, leftItemCount); // Create the left range of page numbers

      // **Visual Representation**
      // Current Page: 2, Sibling Count: 1, Total Pages: 5
      // Pages: [1, 2, 3, ... 5]
      // Left Range: [1, 2, 3]

      return [...leftRange, DOTS, totalPageCount]; // Return the range + dots + last page
    }

    // **State 3**: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Calculate how many items to show on the right
      let rightItemCount = 3 + 2 * siblingCount; // 3 fixed pages + 2 siblings
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      ); // Create the right range

      // **Visual Representation**
      // Current Page: 4, Sibling Count: 1, Total Pages: 6
      // Pages: [1, ... 4, 5, 6]
      // Right Range: [5, 6]

      return [firstPageIndex, DOTS, ...rightRange]; // Return the first page + dots + right range
    }

    // **State 4**: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex); // Create the middle range

      // **Visual Representation**
      // Current Page: 4, Sibling Count: 1, Total Pages: 6
      // Pages: [1, ... 3, 4, 5, ... 6]
      // Middle Range: [3, 4, 5]

      return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex]; // Return first page + dots + middle range + dots + last page
    }
  }, [siblingCount, currentPage, totalPageCount]); // Dependencies to recalculate pagination when these change

  return paginationRange; // Return the calculated pagination range
};

// Helper function to create a range of numbers
function range(start, end) {
  const length = end - start + 1; // Calculate the total number of elements in the range
  // **Create an array from start to end**
  return Array.from({ length }, (value, index) => index + start);
}
