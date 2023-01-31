# SE_egrocery
### Our project for Software Engineering at Yale-NUS
#### Team members: Abdullah, Marc, Jakob, Joshua, Pache
#### Deadline:   By March - Implementation & Testing
- 26/03/23+ -> Project Presentation
- April -> Final Report
#### Bonus: Best project +5%

## Objective:
Create an e-grocery system that allows users to shop for grocery items, put them in a basket, (login) and purchase them online.

## Deliverables:
- Requirement
- Design
- Test Cases
- Documentation
- Software

## Phases of Software Process
1. Inception - Software product is conceived and defined
2. Planning - Initial schedule and resources are determined
3. Requirements Analysis - Specify what the application must do; answers “what?”
4. Design - Specify the parts and how they fit; answers “how?”
5. Implementation - Write the code
6. Testing - Execute the application with input test data

## Matrix of responsibilities
|   Task   | Abdullah |   Marc   |  Jakob   |  Joshua  |  Pache   |
| :------: | :------: | :------: | :------: | :------: | :------: |
|  Setup 1 |          |     x     |     x    |      x   |      x   |
|   ...    |          |          |          |          |          |
|  Backend |          |      x    |          |          |    x      |
|   ...    |          |          |          |          |          |
|  Frontend |    x      |         |      x    |          |         |
|   ...    |          |          |          |          |          |
|   Coordination |          |          |          |      x    |    x      |

## Setup

### Initial Student Team Meeting: General Issues
1. Set agenda and time limits.
2. Choose the team leader. 
3. Get everyone’s commitment to required time and work ethics
– Define an expected average number of hours per week
– Gather dates of planned absences
4. Take a realistic census of team skills
– Common problem: inflated programming skill claims
5. Begin forming a vision of the application
6. Decide how team will collaborate and communicate
7. Take meeting minutes with concrete action items.
   
## 1) Inception
We want the user to be able to browse through a product catalog, select the desired items in the quantities that he wants, collect the items in a shopping cart and pay online. Possible add ons would be (confirmation email, user account, delivery).

## 2) Planning
We divide into frontend (Abdullah, Jakob) and backend (Marc, Pache) + 1 flexible in-between (Joshua).
We meet every Monday at 4pm to keep in sync. We try to work next to each other as much as possible to maximise communication.
- Pache + Marc try to find overlapping work times.
- Abdullah + Jakob try to find overlapping work times.

Vis-a-vis organisation we choose an agile, iterative model.
1) Create rough outline which parts of the system interact with each other
2) Create a list with features ordered by priorities
3) Move from highest to lowest priority feature and dynamically repeat cycle:
   - Requirements
   - Design
   - Implementation
   - Testing
4) Test the whole system

Principles: Optimise for speed and simplicity, maximise communication, get a working core as fast as possible, then add non-essential features.

Features:
1. There should be a product catalog that displays information about all the items that are 
available. (Priority 1)
2. Users should be able to create, add items to, and modify their shopping carts. (Priority 2)
3. The Web site should maintain data for all category/sub-category of their items, such as the 
brand, size/weight, price, and a description. Additionally, information about the registered 
users and the details of their transactions, such as the items they bought, the price they 
paid, the date on which they bought the items, and a mode of payment. (Priority 3)
4. The first Web page of the Web site should be the Home page, which contains links to 
information such as "About eGROCERY, Inc.", how to contact us, location, an overview of 
the departments and their categories that are available in the store, and links to the other 
Web pages on the site. (Priority 4)
5. The Web site should also support security features such as user authentication and 
password encryption. The encryption methods should be of the family of SHA-2 hashing 
algorithms.  (Priority 5)
6. A user registration form should be provided for new users to get registered.  (Priority 6)


## 3) Requirements Analysis
Tools:
- DOORS ([Telelogic](http://www.telelogic/))
- RequisitePro (http://www-306.ibm.com/software/awdtools/reqpro/)
- RD-Link (http://www.ring-zero.com)
- Unicase (http://unicase.org)


### Basic Requirements

#### Product Catalog
Tag system dynamically generating a grid of products based on user filters
**Front-end technologies:** CSS grid
**Back-end technologies:** Database *(MySQL vs. MongoDB?)*

**Flow:**
<ol>
<li>Users choose filter parameters on front-end</li>
<li>Frontend sends list of filters to Back-end</li>
<li>Backend calculates which products fit filters</li>
<li>Backend decides which products to supply to frontend</li>
<li>Css grid automatically displays the items in grid</li>
</ol>

**Questions:**
<ul>
<li>Generate client on backend side or frontend side</li>
</ul>

#### Shopping Cart
List of products selected by user for checkout; should supply a list products to a component that does checkout
**Front-end technologies:** React

**Flow:**
<ol>
<li>The user adds each item to a shopping cart object using react logic<li>
<li>Once the user is done manipulating the frontend object i.e. checks out, react sends json to backend</li>
</ol>

#### User and Order Information
As grocery cart is checked out, this feature should calculate the total, ask for user's information and payment method, and execute the purchase.
**Front-end technologies:** CSS, React
**Front-end technologies:** Databases (different database for user information)

**Flow:**
<ol>
<li>Frontend calculates total, asks for user’s information and payment method</li>
<li>Frontend creates an order object and sends it to backend</li>
<li>Backend completes purchase and updates database accordingly</li>
<li>Backend prompts frontend to display a confirmation page and sends a confirmation email after payment went through</li>
</ol>

#### Home Page
A landing page for users.
**Front-end technologies:** CSS, React, HTML

#### User registration
Collects user information and stores it.
**Front-end technologies:** CSS form
**Back-end technologies:** Database (different from product info)

Flow:
<ol>
<li>Frontend form, once submitted sent to backend</li>
<li>Backend confirms that there is no duplicate email</li>
<li>If true then records user info to database</li>
<li>Backend sends confirmation to frontend, frontend changes screen to confirm registration</li>
</ol>

#### User security
Uses SHA-2 encryption to secure user information
**Back-end technologies:** Database, algorithm

## 4) Design

## 5) Implementation

## 6) Testing
