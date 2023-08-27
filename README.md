# Introduction
A map visualisation project that displays non-live datasets from social housing register (QLD for now) and live APIs onto Google Maps. This project is relevant to UN's Sustainable Development Goal 11: Make cities and human settlements inclusive, safe, resilient and sustainable. This project was created for UQCS Hackathon 2023. 
Team: Homeless Mappers
Teammates: @zainechia @harsharjoshi @Ismesa

# Social Housing Register Map (Beta) - QLD

This file details the specifics of our informative website – QLD Social Housing Map (Beta) (SHR). Due to rising house prices around Australia, including Queensland, the demand for public housing may increase in the near future. To prepare for such an event, or even just ease this future demand and distribution across Queensland – team Trust It Works has created this website. 

<img width="1511" alt="Screenshot 2023-08-27 at 12 28 47 pm" src="https://github.com/Ismesa/social-housing-register-map/assets/74528254/9868c867-a2be-461d-85f3-ff95e40ec837">

## Setup & Running Locally

SHM does not require much maintenance as the data is not updated in real-time, rather the website’s static nature acts as a small downfall because year-by-year the total number of applicants must be updated. Similarly, as Google API was used we must monitor changes to our subscription – and have alternative map APIs (e.g. Leaflet, etc.)

## Tools Used

* Github/Pages: collobartive repository and static website hosting
* Google API: free trial purchased for layering Queensland suburbs on map
* GeoJSON: the extension by which layering was possible
* Excel: Cleaning up the data, as raw data was in .csv
* PapaParse: Primary command (sourced by ChatGBT) to read csv files
* HTML, CSS, Javascript: language used in web development
* ChatGPT: AI tool which helped with HTML, Javascript, CSS programming and specifically to read/clean up .csv dataset files. 
* Dataset Sources:
Federal [Australian Government] (https://data.gov.au/dataset/ds-dga-6bedcb55-1b1f-457b-b092-58e88952e9f0/details), and;
State-Wide [Queensland Government] (https://www.data.qld.gov.au/dataset/social-housing-register/resource/9fd99c88-c117-4e30-8b4b-54ac24170b80?inner_span=True)

## Functionality

When approaching functionality, the primary mission was to utilise publicly available data from Queensland Government's relevant datasets to perform range-based analysis to calculate demand, which have been uploaded as CSV files. Data was cleaned up such that a more concise representation could be demonstrated via Excel. 

* `raw-data` for initial range-based analysis to calculate demand
* `clean-data` cleaning data and utilising relevant data points to be visualised

Location based data was another defining feature of the product. Free Google API trial was purchased for layering purposes - which the GeoJSON helped defined. A combination of HTML, CSS and javascript aided in the website format of the project. 

# Conclusions and Future Scope

Overall, SHM QLD was created to allow users to have an interactive platform whereby they can easily use a visual reference point to pinpoint available areas for social housing. Ideally, it is aimed for future scope to market this product toward low income areas and families. In the future, the team would like to implement more user-focused features including locations with the highest accessibility housing. 

Features wise, increased data visualisation, specifically year-by-year comparative data (i.e. showing percentage change in terms of demand) would be a focus of Homeless Mappers. Further, having a better interface for metadata such that those applying can compare years and trends on the same map via layering - an option is to make the above bar have a multi-select tool. Finally, the average public house pricing should also be included in each locality. 
