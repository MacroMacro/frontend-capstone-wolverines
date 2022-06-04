# Front-End-Capstone

## **Description**

We designed an e-commerce website with user-friendly interfaces to reflect the nested product data retrieved from the API, with a local server to post and get requests.  

The webpage mainly consists four sections: Product Overview, Related Products and Outfit, Questions and Answers, and Ratings and Reviews.

## **Intallation**
**_npm install_**: install necessary dependencies for this project.<br>
**_npm run react-dev_**: begin webpack for the client.<br>
**_npm start_**: run the client server.<br>
**_npx jest_**: run the testing files.<br>

## **Components**

**1. Product Overview**
  - Navigation bar with menu list, search function, and dark theme mode
  - Image gallery and production information section with style selector, adding to cart option
  
  ![Product Overview](https://user-images.githubusercontent.com/26387488/172020601-c541f147-b469-4095-8438-896c977d0823.png)

**2. Related Products and Outfit**
  - Displays a set of products that are determined internally and another set of products hand picked by the user to create an "outfit".
  - Allows for comparison of a related item and the item showing in Overview.
  - Clicking on a related product will re-render the entire page based off that product's information
  
  ![Related Products and Outfit](https://user-images.githubusercontent.com/99494242/172021736-c3541119-a31b-4fda-b4c9-a57a48f919e0.png)

**3. Questions and Answers**
  - Component that houses user uploaded questions and answers to those questions
  - Questions and answers organized by helpfulness ratings
  - Allows users to report answers to have them no longer render on page
  - search bar allows users to filter questions
  - Add Question and Add Answer modals allow users to also upload questions and answers of their own
  ![image](https://user-images.githubusercontent.com/94881840/172021395-9b0f389c-a837-417d-b79f-ed7fe7d5a7df.png)
  
**4. Ratings and Reviews**
  - Review list with functionality to add a review, as well as populate more reviews to the list
  - Ability to sort the list by newest, relevant, and most helpful reviews
  - Users can filter the list based on the number of stars a review was given
  - Upload your own images to a new review submission for viewers to see
  - Expand images that were added to users reviews
  - Displays the overall rating of the current product
  ![Ratings   Reviews](https://user-images.githubusercontent.com/93555749/172021608-6c408683-3efc-4f7b-bdee-37e34917273c.jpg)

## **Credits**
- [Fan Zhang](https://github.com/AliciaFZhang), Product Overview
- [Barry Cheung](https://github.com/bleecheung), Related Products and Outfit
- [Jerry Tapia](https://github.com/jerrytapia), Questions and Answers
- [Leia Harlow](https://github.com/leiaHarlow), Ratings and Reviews


