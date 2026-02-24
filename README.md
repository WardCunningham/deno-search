# Deno Search
We wrap a substantial computation with just enough webserver logic to show in a federated wiki lineup as remote but still interactive pages.
We've chosen a federation search engine as a test case becaue it could prove useful in its own right.
This is built on Deno's most elementary server support. There is no fancy framework to hide what must be done.

# Plan
We are happy to hear suggestions in our regular federated wiki video conferences.
We won't be looking for issues or pull requests just yet.
Eventually we will provide a hackers guide for those with substantial computations of their own that could benefit from this treatment.

- [x] Serve page json from an in-memory encoding.
- [x] Serve favicon.png used for protocol sensing.
- [x] Serve an elementary sitemap.json to enage search and twins.
- [ ] Handle forms expressed with the HTML plugin.
- [x] Redirect home page queries to fed.wiki for client support.
- [ ] Test Deno Deploy based hosting within their free tier.
- [ ] Build small datasets as asset files.
- [ ] Test Deno KV store for scrape data.
- [ ] Test form based queries of KV data.
- [ ] Test building aspect graphs for viewing with Solo.
- [ ] Test sourcing/sinking data with Mech blocks.
