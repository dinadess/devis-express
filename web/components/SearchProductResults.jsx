import { ProductsPerCategory } from "./ProductsPerCategory";

export function SearchProductResults({
  loading,
  error,
  productData,
  searchText,
}) {
  if (loading) {
    return <p className="text-sm">Chargement des données...</p>;
  }
  if (error) {
    return <p className="text-sm">Erreur : {error}</p>;
  }
  if (searchText && Object.keys(productData)?.length === 0) {
    return <p className="text-sm">Aucun produit trouvé</p>;
  }

  return <ProductsPerCategory productData={productData} />;
}
