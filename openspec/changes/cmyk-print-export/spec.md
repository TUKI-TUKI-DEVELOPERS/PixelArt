# Split RGB and CMYK Print PDFs

For both personalized-book orders and photobook projects, future standard RGB generation and on-demand CMYK print export MUST produce two separate files: a two-page front/back cover PDF, and an interior-content PDF. Existing PDFs, source assets, and customer projects remain unchanged. Future photobook generations omit spine content because Miguel handles the spine.

## Requirements

### Requirement: Standard PDFs are split into covers and interior content

Future standard RGB generation for personalized books and photobooks MUST produce two PDFs. The covers PDF MUST contain the front cover as page 1 and the back cover as page 2. The interior PDF MUST contain only the interior content, in its existing order. Existing generated PDFs MUST remain unchanged.

#### Scenario: Generate standard PDFs for a personalized book

- GIVEN a personalized-book order has front and back covers and ordered interior content
- WHEN its standard PDFs are generated
- THEN the covers PDF contains the front cover first and the back cover second
- AND the separate interior PDF contains only the interior pages in order
- AND any previously generated PDF remains unchanged

#### Scenario: Generate standard PDFs for a photobook

- GIVEN a photobook has front and back covers and ordered interior pages
- WHEN its standard PDFs are generated
- THEN the covers PDF contains the front cover first and the back cover second
- AND the separate interior PDF contains only the interior pages in order
- AND no PDF contains spine content or a combined cover wrap
- AND any previously generated PDF remains unchanged

### Requirement: Personalized-book generation fails safely when a required source is unavailable

Standard personalized-book generation MUST abort when any required confirmed print-asset source (cover, template page/part, or add-on) cannot be downloaded or optimized. It MUST NOT publish a partial pair or change the current render pointer; previously published files remain untouched. The admin order detail panel MUST show a safe, actionable Spanish error identifying the asset kind and available page position/part, without exposing storage keys or stack details.

#### Scenario: Required interior source is unreadable

- GIVEN a required personalized-book interior print source cannot be prepared
- WHEN an administrator generates the PDF pair
- THEN generation fails instead of emitting a blank or invalid page
- AND no pair is published and the prior render pointer and files remain unchanged
- AND the admin sees an actionable Spanish error

#### Scenario: No confirmed print sources are available

- GIVEN a personalized-book order has no confirmed print-asset sources
- WHEN an administrator requests standard PDF generation
- THEN generation fails with an actionable Spanish error instead of reporting success
- AND the prior render pointer and files remain unchanged

### Requirement: Cross-sell catalog thumbnails are optional

Cross-sell catalog-cover thumbnails are auxiliary promotional content, not required order print sources. When a thumbnail cannot be downloaded or prepared, the promotional card may omit the image while retaining its available title, description, and QR code; this does not abort the personalized-book PDF generation.

#### Scenario: A cross-sell thumbnail is unavailable

- GIVEN a cross-sell catalog card has a stored thumbnail that cannot be prepared
- WHEN the personalized-book PDF is generated
- THEN the card remains with its available text and QR code without the thumbnail
- AND the generation continues without treating the thumbnail as a missing required print source

### Requirement: On-demand CMYK print exports provide two files

The system MUST offer administrators separate on-demand CMYK downloads for the covers PDF and the interior PDF of both supported product types. Each file MUST be downloadable without replacing or mutating a standard PDF, source PNGs, customer projects, or covers. The system MUST NOT send either file automatically to a printer.

#### Scenario: Export personalized-book covers and interior

- GIVEN an administrator can access a personalized-book order
- WHEN the administrator requests the covers print export
- THEN the system provides a separate CMYK PDF with front cover on page 1 and back cover on page 2
- WHEN the administrator requests the interior print export
- THEN the system provides a separate CMYK PDF containing only the interior content in order
- AND the existing standard PDFs and source assets remain unchanged

#### Scenario: Export photobook covers and interior

- GIVEN an administrator can access a photobook project
- WHEN the administrator requests the covers print export
- THEN the system provides a separate CMYK PDF with front cover on page 1 and back cover on page 2
- WHEN the administrator requests the interior print export
- THEN the system provides a separate CMYK PDF containing only the interior pages in order
- AND the files contain no spine content or combined cover wrap
- AND the existing standard PDFs and project assets remain unchanged

#### Scenario: Access remains restricted

- GIVEN a user does not have the existing administrative access to an order or project
- WHEN that user attempts to request or download any standard or CMYK output
- THEN the request is denied under the existing access controls

### Requirement: Apply the documented standard reference CMYK profile to each complete output

The system MUST convert each covers and interior print PDF as a complete PDF using a documented, licensed standard reference ICC profile, and the requested CMYK output MUST contain CMYK color output only. Existing standard RGB outputs MUST remain RGB and unchanged. The initial active profile MUST be the unaltered `APTEC_Offset_Coated_LinearCTV_2025.icc` profile, identified by SHA-256 `2a0a26387276046dc129d4330a7a45542b736c8640e3ec4cb74df809c5ccfb0e`, 2,685,584 bytes, ICC 4.2.0 CMYK/Lab. Documentation MUST identify its source as the [ICC Profile Registry](https://registry.color.org/profile-registry/APTEC_Offset_Coated_LinearCTV_2025), its standard condition as ISO 12647-2:2013 paper type 1 / premium coated stock, and its total area coverage as 320%. Its official binary is [APTEC_Offset_Coated_LinearCTV_2025.icc](https://registry.color.org/profile-registry/profiles/APTEC_Offset_Coated_LinearCTV_2025.icc). The profile permits copying, distribution, embedding, use, and sale without restriction and is made available with Eastman Kodak permission; it MUST NOT be altered or misrepresented. The profile is a standard reference condition, not a printer-specific profile. The system MUST NOT promise matching a particular printer or paper, or exact print-color matching. The active profile MAY be replaced for future exports if a suitable licensed profile is selected. The system MUST NOT silently substitute a different or unavailable profile.

#### Scenario: Export using the initial reference profile

- GIVEN the initial active profile is the documented APTEC standard reference profile
- WHEN an administrator generates either CMYK output
- THEN that complete PDF is converted using the configured profile
- AND the output is described as using the standard reference condition, not as guaranteeing a printer, paper, or exact color match

#### Scenario: Profile is unavailable

- GIVEN the configured active ICC profile is missing or unavailable
- WHEN an administrator requests a CMYK print export
- THEN the system reports that the export cannot be produced with the configured profile
- AND it does not silently use another profile or present an unconverted PDF as the requested CMYK output
- AND all existing PDFs and source assets remain unchanged

#### Scenario: Conversion fails

- GIVEN conversion of either complete output using the active profile fails
- WHEN an administrator requests a print export
- THEN the system reports that the requested print export failed
- AND it does not offer a partial or falsely successful file
- AND all existing PDFs and source assets remain unchanged

#### Scenario: Profile changes for future exports

- GIVEN the active profile has been replaced with a printer-supplied ICC profile
- WHEN a new covers or interior print export is generated
- THEN that new export uses the replacement profile
- AND previously generated PDFs remain unchanged

### Requirement: Photobook outputs do not generate a spine or combined wrap

Every future standard or CMYK photobook generation MUST use separate front and back cover sources and MUST produce a two-page covers PDF plus a separate interior PDF. The system MUST NOT generate spine content or a combined cover wrap. PDFs generated before this behavior takes effect MUST remain untouched.

#### Scenario: Generate a photobook output

- GIVEN a photobook has standalone front and back cover sources and ordered interior pages
- WHEN a standard or CMYK output is generated
- THEN the covers PDF contains the front cover on page 1 and the back cover on page 2
- AND the interior PDF contains each interior page individually in its existing order
- AND neither file contains spine content or a combined cover wrap

#### Scenario: Regenerate a photobook output

- GIVEN a photobook already has generated files
- WHEN an administrator generates new standard PDFs
- THEN the new files follow the two-file, no-spine requirements
- AND the previously generated files remain unchanged

#### Scenario: Preserve pre-existing output

- GIVEN a photobook PDF was generated before the no-spine behavior takes effect
- WHEN the new behavior is introduced or new PDFs are generated
- THEN the previously generated PDF and any old wrap file are not retroactively modified or deleted

### Requirement: Do not impose an unsupported resolution gate

The system MUST NOT reject or block a print export solely because a source image falls below a guessed resolution threshold, and MUST NOT upscale images solely to meet an unspecified resolution requirement.

#### Scenario: Source image has low resolution

- GIVEN a supported order or project contains an image below a guessed print-resolution threshold
- WHEN an administrator requests either print file
- THEN the system does not block or upscale the export solely on that basis
