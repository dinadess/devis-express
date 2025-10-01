import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchProductItem from "./SearchProductItem";

export function ProductsPerCategory({ productData }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={Object.keys(productData)[0]}
    >
      {Object.entries(productData).map(([category, products]) => (
        <AccordionItem value={category} key={category}>
          <AccordionTrigger className="hover:no-underline">
            <div className="text-xs flex items-center gap-2">
              <div className="text-white bg-primary-color-400 rounded-primary-button px-2 py-1">
                {category}
              </div>
              <p>({products?.length})</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-5 text-balance">
              {products.map((product) => (
                <SearchProductItem key={product.id} product={product} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
