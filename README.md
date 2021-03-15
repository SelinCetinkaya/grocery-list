# Stock-Up

# Project Overview

## Project Name

Stock-Up

## Project Description

Grocery shopping is many people's least favorite chore. Part of the reason for this is the overwhelming feeling of all of the options and being surrounded by so many people in such a large space. Even if you come with a list, it's frequently unorganized and leaves you running back and forth from section to section. Stock-Up is an app to help categorize your grocery list in an easy-to-use format, allowing you to streamline your trips to the grocery store, making them just a little more fun.

## Wireframes

The items in the API are rendered by category and then into two subcategories (still needed, and already retrieved). When the user checks the box next to each item in the top section, it will move to the bottom section. Additionally, a user can edit and add items from the same page. 

This app is meant to be used on a mobile phone so I will be focusing on designing for smartphones.

[Smartphone Wireframe](https://i.imgur.com/MFSAH7f.png)

[Tablet Wireframe](https://i.imgur.com/qOoPy2b.png)

[Desktop Wireframe](https://i.imgur.com/KLk3oET.png)

## Component Hierarchy
[Component Hierarchy](https://imgur.com/zQWqhri)

## API and Data Sample

```json
{
    "records": [
        {
            "id": "recHUbTKDqc6ubmsL",
            "fields": {
                "title": "greek yogurt",
                "brand": "Fage",
                "category": "dairy",
                "notes": "the one with the highest fat content"
            },
            "createdTime": "2021-03-14T20:37:56.000Z"
        },
        {
            "id": "recUNkaQwyBaa5Mzl",
            "fields": {
                "title": "avocados",
                "category": "produce"
            },
            "createdTime": "2021-03-14T20:37:56.000Z"
        },
        {
            "id": "recqOjHra4f0eXZbs",
            "fields": {
                "title": "spaghetti",
                "category": "pantry",
                "notes": "if no spaghetti, get linguini"
            },
            "createdTime": "2021-03-14T20:37:56.000Z"
        }
    ]
}
```

### MVP/PostMVP

#### MVP 

- Create and use external api 
- Render data by category
- Ability to add/edit/delete a grocery list item
- When list items are checked off they move to the "in the cart" section
- Use tabs to navigate between categories

#### PostMVP  

- Adding an additional subcategory to organize by recipe
- Adding a saved/favorites log to save previously shopped items
- Include welcome screen
- Ability to add/delete categories
- Clear All button for when a user is finished shopping

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|March 12-14| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|March 15| Project Approval | Incomplete
|March 16| Core Application Structure (HTML, CSS, React Components Created) | Incomplete
|March 17| Successful GET/POST API Calls | Incomplete
|March 18| MVP Complete / Begin Post-MVP  | Incomplete
|March 19| Post-MVP / Styling | Incomplete
|March 22| Presentations | Incomplete

## Timeframes


| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Successful API Calls | H | 2hrs| hrs | hrs |
| Familiarize Self with CSS Framework | M | 3hrs| hrs | hrs |
| Basic Structural CSS | H | 3hrs| hrs | hrs |
| Create Form Component | H | 1.5hrs| hrs | hrs |
| POST Functionality via Form Component | H | 4hrs| hrs | hrs |
| GET Functionality via Form Component | M | 3hrs| hrs | hrs |
| PUT Functionality via Form Component | H | 4hrs| hrs | hrs |
| Render Category Tabs to Page | H | 4hrs| hrs | hrs |
| Render Needed Items in List to Page | H | 3hrs| hrs | hrs |
| Render Retrieved Items List to Page | H | 3hrs| hrs | hrs |
| Functionality to Move Needed Items to Retrieved List | M | 4hrs| hrs | hrs |
| toggleFetch Functionality | H | 4hrs| hrs | hrs |
| Create Header | M | 2hrs| hrs | hrs |
| Total | H | 40.5hrs| hrs | hrs |

## SWOT Analysis

### Strengths:
I am basing this project on what I would find helpful in my daily life, so I have a very clear understanding of the problem that I am trying to solve. I put a lot fo thought into conceptualizing this app before I wrote anything down so I am very familiar with what I think should be part of MVP and Post-MVP. Additionally, I spent a lot fo time on my wireframe so I feel good about how I will be structuring the components.

### Weaknesses:
Styling has been a weakness of mine in the past. I look forward to exploring the possibilities that come with using a CSS library and getting more comfortable with styling in general.

### Opportunities:
Since this is an app based on a real-life problem that I experience, I am excited to not only get it functional for this project, but also work on it post-course to add additional functionality that I think would be helpful. It will be fun to be able to shpw off everything that I have learned so far in an app that I genuinely believe I would use in my personal life.

### Threats:
I tend to avoid things that I know I won't get right the first time. I will need to remind myself that this is my opporunity to get uncomfortable and push myself to learn and become a better software engineer, even if that means getting something wrong the first time around.
