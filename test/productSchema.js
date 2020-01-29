export const productDataSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/root.json",
  type: "object",
  title: "The Root Schema",
  required: ["url", "name", "description", "product", "breadcrumb"],
  properties: {
    url: {
      $id: "#/properties/url",
      type: "string",
      title: "The Url Schema",
      default: "",
      examples: [
        "https://www.seoultravelpass.com/en/products/393-global-seoul-mate-gangnam-1-1-language-exchange-gathering"
      ],
      pattern: "^(.*)$"
    },
    name: {
      $id: "#/properties/name",
      type: "string",
      title: "The Name Schema",
      default: "",
      examples: ["[Global Seoul Mate] Gangnam 1:1 Language Exchange Gathering"],
      pattern: "^(.*)$"
    },
    description: {
      $id: "#/properties/description",
      type: "string",
      title: "The Description Schema",
      default: "",
      examples: [
        "Through the Gangnam 1:1 Language Exchange Gathering  organized by the Global Seoul Mate, you can learn Korean and make new friends"
      ],
      pattern: "^(.*)$"
    },
    product: {
      $id: "#/properties/product",
      type: "object",
      title: "The Product Schema",
      required: ["name", "description", "priceCurrency", "price"],
      properties: {
        id: {
          $id: "#/properties/product/properties/id",
          type: "string",
          title: "The Id Schema",
          default: "",
          examples: [
            "https://www.seoultravelpass.com/en/products/393-global-seoul-mate-gangnam-1-1-language-exchange-gathering"
          ],
          pattern: "^(.*)$"
        },
        name: {
          $id: "#/properties/product/properties/name",
          type: "string",
          title: "The Name Schema",
          default: "",
          examples: [
            "[Global Seoul Mate] Gangnam 1:1 Language Exchange Gathering"
          ],
          pattern: "^(.*)$"
        },
        sku: {
          $id: "#/properties/product/properties/sku",
          type: "string",
          title: "The Sku Schema",
          default: "",
          examples: ["393"],
          pattern: "^(.*)$"
        },
        mpn: {
          $id: "#/properties/product/properties/mpn",
          type: "string",
          title: "The Mpn Schema",
          default: "",
          examples: ["393"],
          pattern: "^(.*)$"
        },
        images: {
          $id: "#/properties/product/properties/images",
          type: "array",
          title: "The Images Schema",
          items: {
            $id: "#/properties/product/properties/images/items",
            type: "string",
            title: "The Items Schema",
            default: "",
            examples: [
              "https://dsj1e5gc359pm.cloudfront.net/uploads/products/393/main/3c03baf4-1-2.jpg?w=500",
              "https://dsj1e5gc359pm.cloudfront.net/products/393/list/6a7acdf0-2-2.jpg?w=800",
              "https://dsj1e5gc359pm.cloudfront.net/products/393/list/ff5c7dfa-w1.jpg?w=800",
              "https://dsj1e5gc359pm.cloudfront.net/products/393/list/5a896a38-2-3.jpg?w=800"
            ],
            pattern: "^(.*)$"
          }
        },
        description: {
          $id: "#/properties/product/properties/description",
          type: "string",
          title: "The Description Schema",
          default: "",
          examples: [
            "Through the Gangnam 1:1 Language Exchange Gathering  organized by the Global Seoul Mate, you can learn Korean and make new friends"
          ],
          pattern: "^(.*)$"
        },
        priceCurrency: {
          $id: "#/properties/product/properties/priceCurrency",
          type: "string",
          title: "The Pricecurrency Schema",
          default: "",
          examples: ["KRW"],
          pattern: "^(.*)$"
        },
        price: {
          $id: "#/properties/product/properties/price",
          type: "number",
          title: "The Price Schema",
          default: "",
          examples: [80.1],
          pattern: "^(.*)$"
        },
        tags: {
          $id: "#/properties/product/properties/tags",
          type: "array",
          title: "The Tags Schema",
          items: {
            $id: "#/properties/product/properties/tags/items",
            type: "string",
            title: "The Items Schema",
            default: "",
            examples: ["24 Hours confirmation", "Real-time Voucher"],
            pattern: "^(.*)$"
          }
        },
        address: {
          $id: "#/properties/product/properties/address",
          type: "string",
          title: "The Address Schema",
          default: "",
          examples: ["3F, 56, Hakdong-ro 2-gil, Gangnam-gu, Seoul"],
          pattern: "^(.*)$"
        },
        latitude: {
          $id: "#/properties/product/properties/latitude",
          type: "string",
          title: "The Latitude Schema",
          default: "",
          examples: ["37.507881"],
          pattern: "^(.*)$"
        },
        longitude: {
          $id: "#/properties/product/properties/longitude",
          type: "string",
          title: "The Longitude Schema",
          default: "",
          examples: ["127.023621"],
          pattern: "^(.*)$"
        }
      }
    },
    breadcrumb: {
      $id: "#/properties/breadcrumb",
      type: "array",
      title: "The Breadcrumb Schema",
      items: {
        $id: "#/properties/breadcrumb/items",
        type: "string",
        title: "The Items Schema",
        default: "",
        examples: [
          "Korea",
          "Seoul",
          "[Global Seoul Mate] Gangnam 1:1 Language Exchange Gathering"
        ],
        pattern: "^(.*)$"
      }
    }
  }
};
