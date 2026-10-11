# CMYK Print Export and Split Book PDFs

## Problem

PixelArt currently produces RGB PDFs whose embedded images and vector/text colors are not converted to the CMYK condition requested by the print shop. The current photobook production also generates spine content, but Miguel will handle the spine. The existing PDFs do not provide the requested separate cover and interior files for production.

## Outcome

For both personalized books and photobooks, future standard RGB generation and on-demand CMYK print export provide two separate PDFs:

1. A covers PDF with the front cover on page 1 and the back cover on page 2.
2. An interior PDF containing only the interior content in its existing order.

The CMYK files are generated on demand using the owner-approved, unaltered `APTEC_Offset_Coated_LinearCTV_2025.icc` licensed standard reference profile. It is not printer-specific, and exact matching to a particular printer or paper is not guaranteed. Existing PDFs, source images, projects, and covers remain unchanged.

For future photobook generations, do not generate spine content or a combined cover wrap. Use the existing standalone front/back cover assets. Previously generated PDFs and wrap assets remain untouched.

## Confirmed product rules

- Apply the two-file split to both standard RGB output and CMYK print output for both product types.
- Keep the front and back covers together in their own two-page PDF, ordered front first and back second; keep all interior pages in the other PDF.
- Provide independent administrative downloads for the cover pair and the interior content in each output format.
- CMYK print exports MUST contain CMYK output only and convert each complete PDF using the active ICC profile, not only its source images; preserve standard RGB outputs unchanged.
- Use the unaltered `APTEC_Offset_Coated_LinearCTV_2025.icc` initially. Its SHA-256 is `2a0a26387276046dc129d4330a7a45542b736c8640e3ec4cb74df809c5ccfb0e`, size is 2,685,584 bytes, and it is an ICC 4.2.0 CMYK/Lab profile for ISO 12647-2:2013 paper type 1 / premium coated with 320% total area coverage. Source: [ICC Profile Registry](https://registry.color.org/profile-registry/APTEC_Offset_Coated_LinearCTV_2025); official profile: [APTEC_Offset_Coated_LinearCTV_2025.icc](https://registry.color.org/profile-registry/profiles/APTEC_Offset_Coated_LinearCTV_2025.icc). The profile is licensed for copying, distribution, embedding, use, and sale without restriction and is made available with Eastman Kodak permission. Do not alter or misrepresent it.
- This is a standard reference condition, not a printer-specific profile; do not promise a match to a specific printer or paper or exact print-color matching. Any future profile replacement requires a suitable licensed profile.
- Remove the spine-generation behavior from future photobook generation. Do not create a combined cover wrap.
- Preserve existing PDFs and all source PNGs, covers, and customer projects. Do not automatically send files to a printer.
- Do not impose a minimum image-resolution threshold or upscale images without a printer requirement.

## Non-goals

- Changing OpenAI image generation or converting/replacing stored source images.
- Deploying to the VPS or automatically sending files to the print shop.
- Introducing a database migration or seed change; the existing render-key fields can point to a generation-scoped covers PDF, with the interior PDF stored as its sibling.
- Creating replacement spine artwork or spine text; Miguel owns all spine production.
- Claiming that the selected standard reference profile guarantees a match to a specific printer or paper or exact print-color matching.

## Risks and assumptions

- APTEC_Offset_Coated_LinearCTV_2025 is the selected licensed standard reference profile for premium coated stock, not a printer-specific profile. Printer/paper characteristics and calibration may differ, so exact matching is not guaranteed.
- The reviewed sample PDFs contain some placed images below 150 ppi. No minimum was provided, so export will not be blocked on resolution; print sharpness may vary.
- Splitting standard and CMYK outputs means four downloadable variants per order/project: standard covers, standard interior, CMYK covers, and CMYK interior. These can be grouped by format in the admin UI.
