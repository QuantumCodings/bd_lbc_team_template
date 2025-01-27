# [team name] Design Document

## Instructions

*Save a copy of this template for your team in the same folder that contains
this template.*

*Replace italicized text (including this text!) with details of the design you
are proposing for your team project. (Your replacement text shouldn't be in
italics)*

*You should take a look at the example design document in the same folder as
this template for more guidance on the types of information to capture, and the
level of detail to aim for.*

## *calender/ task list site* Design

## 1. Problem Statement

*i want to make an easy to use shop website for a drink shop with deals and subscriptions delivery and the rest


## 2. Top Questions to Resolve in Review

*List the most important questions you have about your design, or things that
you are still debating internally that you might like help working through.*

1.   want to make it so you can check order history
2.   want to implement a subscription merits
3.  want to add at least 3 items

## 3. Use Cases

*This is where we work backwards from the customer and define what our customers
would like to do (and why). You may also include use cases for yourselves, or
for the organization providing the product to customers.*

U1. *As a [product] customer, I want to `be notified` when I `when any sales come up`*

U2. *As a [product] customer, I want to view order history on the site*
    
U3. ...

## 4. Project Scope

*Clarify which parts of the problem you intend to solve. It helps reviewers know
what questions to ask to make sure you are solving for what you say and stops
discussions from getting sidetracked by aspects you do not intend to handle in
your design.*

### 4.1. In Scope

*it makes the website an easy frequent to use delivery machine?*

### 4.2. Out of Scope

*their are problems i wont be solving there can always be more improvements into the virtual shop afterwords.*

# 5. Proposed Architecture Overview

*Describe broadly how you are proposing to solve for the requirements you
described in Section 3.*
i plan to build a drink shop from juices to coffee to tea, with customization that can be ordered for pick up and delivery
in a most efficient way

*This may include class diagram(s) showing what components you are planning to
build.*

*You should argue why this architecture (organization of components) is
reasonable. That is, why it represents a good data flow and a good separation of
concerns. Where applicable, argue why this architecture satisfies the stated
requirements.*

# 6. API

## 6.1. Public Models
openapi: 3.0.0
info:
  title: Squeeze & Steep
  description: Api for the store Squeeze & Steep a tea, juice, coffee shop
  version: 0.1.9

servers:
  - url: http://www.Squeeze & Steep.com(fakefornow)
    description: the website for the shop
  - url: http://www.Squeeze & Steep.com/subscribe(fakefornow)
    description: Subscribing to Squeeze & Steep for updates
  - url: http://www.Squeeze & Steep.com/events
    description: The website for upcoming events and activities    

paths:
  /subscribe:
    get:
      summary: adds your subscription
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
  /order:
    post:
      summary: Place an order
      description: Places an order with a memberID, price, and delivery address.
      parameters:
        - name: discountCode
          in: query
          description: Optional discount code for the order.
          required: false
          schema:
            type: string
        - name: deliveryTime
          in: query
          description: Preferred delivery time in ISO 8601 format.
          required: false
          schema:
            type: string
            format: date-time
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                memberID:
                  type: string
                  description: The unique identifier of the member placing the order.
                price:
                  type: number
                  format: float
                  description: The total price of the order.
                address:
                  type: string
                  description: The delivery address for the order.
              required:
                - memberID
                - price
                - address
      responses:
        "200":
          description: Order successfully placed.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Order placed successfully"
                  orderID:
                    type: string
                    description: Unique ID of the placed order.
        "400":
          description: Bad Request - Invalid input
        "500":
          description: Internal Server Error
  /orders/{memberID}:
    get:
      summary: Get previous orders
      description: Retrieves a list of previous orders for a given memberID.
      parameters:
        - name: memberID
          in: path
          required: true
          description: The unique identifier for the member whose orders are being requested.
          schema:
            type: string
      responses:
        "200":
          description: A list of previous orders for the member.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    orderID:
                      type: string
                      description: The unique identifier of the order.
                    price:
                      type: number
                      format: float
                      description: The total price of the order.
                    address:
                      type: string
                      description: The delivery address for the order.
                    date:
                      type: string
                      format: date-time
                      description: The date when the order was placed.
        "404":
          description: No orders found for the given memberID.
        "500":
          description: Internal Server Error    
  /events:
    get:
      summary: Get upcoming events
      description: Retrieves a list of upcoming events hosted by Squeeze & Steep.
      responses:
        "200":
          description: A list of upcoming events.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    eventID:
                      type: string
                      description: The unique identifier of the event.
                    eventName:
                      type: string
                      description: The name of the event.
                    eventDate:
                      type: string
                      format: date-time
                      description: The date and time of the event.
                    location:
                      type: string
                      description: The location where the event will be held.
                    description:
                      type: string
                      description: A short description of the event.
        "404":
          description: No upcoming events found.
        "500":
          description: Internal Server Error
    post:
      summary: Subscribe to event notifications
      description: Subscribe to receive notifications about upcoming events.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                memberID:
                  type: string
                  description: The unique identifier of the member subscribing to events.
                email:
                  type: string
                  format: email
                  description: The email address to send event notifications to.
              required:
                - memberID
                - email
      responses:
        "200":
          description: Successfully subscribed to event notifications.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Successfully subscribed to event notifications."
        "400":
          description: Bad Request - Invalid input
        "500":
          description: Internal Server Error       

## 6.2. *First Endpoint*

*Describe the behavior of the first endpoint you will build into your service
API. This should include what data it requires, what data it returns, and how it
will handle any known failure cases. You should also include a sequence diagram
showing how a user interaction goes from user to website to service to database,
and back. This first endpoint can serve as a template for subsequent endpoints.
(If there is a significant difference on a subsequent endpoint, review that with
your team before building it!)*

*(You should have a separate section for each of the endpoints you are expecting
to build...)*

## 6.3 *Second Endpoint*

*(repeat, but you can use shorthand here, indicating what is different, likely
primarily the data in/out and error conditions. If the sequence diagram is
nearly identical, you can say in a few words how it is the same/different from
the first endpoint)*

# 7. Tables

A subscriptions table
an order table
an events table
an events subscribtion table

# 8. Pages

the web pages will have 3 pages the starting menu website
an events page
and a subscription page
