export default {
  async afterCreate(event) {
    const { result } = event;

    if (result.id && !result.slug) {
      const year = new Date().getFullYear();
      const idPadded = String(result.id).padStart(3, "0");

      const slug = `DEV-${year}-${idPadded}`;

      // Update the entry with the generated slug
      await strapi.entityService.update("api::quote.quote", result.id, {
        data: {
          slug,
        },
      });
    }
  },
};
