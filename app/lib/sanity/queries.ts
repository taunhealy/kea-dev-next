import { client } from "@/app/lib/sanity/client";
import { WorkProps } from "@/app/work/[slug]/types";

export async function getRelatedWorks(currentWork: WorkProps) {
  if (!currentWork?.categories || currentWork.categories.length === 0) {
    return { nextWork: null, prevWork: null };
  }

  // Get primary category
  const primaryCategoryId = currentWork.categories[0]._id;
  
  // Query for works in the same category, ordered by completion date
  const relatedWorks = await client.fetch(`
    *[_type == "work" && 
      references($categoryId) && 
      _id != $currentId && 
      !inDevelopment] | order(completionDate desc) {
      _id,
      title,
      slug,
      description,
      "coverImage": coverImage.asset->{
        "url": url,
        "metadata": metadata
      },
      categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `, {
    categoryId: primaryCategoryId,
    currentId: currentWork._id
  });

  // Find the index of the current work in the hypothetical full list
  const currentWorkDate = new Date(currentWork.completionDate || 0);
  
  // Find works that would come before and after the current work
  let nextWork = null;
  let prevWork = null;
  
  for (let i = 0; i < relatedWorks.length; i++) {
    const workDate = new Date(relatedWorks[i].completionDate || 0);
    
    if (workDate > currentWorkDate && !nextWork) {
      nextWork = relatedWorks[i];
    }
    
    if (workDate < currentWorkDate) {
      prevWork = relatedWorks[i];
      break;
    }
  }

  return { nextWork, prevWork };
}