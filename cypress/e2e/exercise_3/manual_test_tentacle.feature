Feature: Tentacles Input Field Validation
  Tests cases to cover the validation of the tentacles input field 
  Different scenarios including valid inputs, invalid inputs, and error-handling cases 
  non-numeric, decimals, empty. 

  Background: Go to form page
    Given I am on the form page

  Scenario: Insert the minimum valid value
    When I enter 10 into the "tentacles" input field
    And I click the "Send" button
    Then I should see a "Success" message

  Scenario: Insert the maximum valid value
    When I enter 100 into the "tentacles" input field
    And I click the "Send" button
    Then I should see a "Success" message

  Scenario Outline: Inert a valid range value
    When I enter <tentacles_value> into the "tentacles" input field
    And I click the "Send" button
    Then I should see a "Success" message

    Examples:
    |tentacles_value  |
    | 10              |
    | 11              |
    | 12              |
    | 13              |
    | 14              |
    | 15              |
    | 16              |
    | 17              |
    | 18              |
    | 19              |
    | 20              |
    | 21              |
    | 22              |
    | 23              |
    | 24              |
    | 25              |
    | 26              |
    | 27              |
    | 28              |
    | 29              |
    | 30              |
    | 31              |
    | 32              |
    | 33              |
    | 34              |
    | 35              |
    | 36              |
    | 37              |
    | 38              |
    | 39              |
    | 40              |
    | 41              |
    | 42              |
    | 43              |
    | 44              |
    | 45              |
    | 46              |
    | 47              |
    | 48              |
    | 49              |
    | 50              |
    | 51              |
    | 52              |
    | 53              |
    | 54              |
    | 55              |
    | 56              |
    | 57              |
    | 58              |
    | 59              |
    | 60              |
    | 61              |
    | 62              |
    | 63              |
    | 64              |
    | 65              |
    | 66              |
    | 67              |
    | 68              |
    | 69              |
    | 70              |
    | 71              |
    | 72              |
    | 73              |
    | 74              |
    | 75              |
    | 76              |
    | 77              |
    | 78              |
    | 79              |
    | 80              |
    | 81              |
    | 82              |
    | 83              |
    | 84              |
    | 85              |
    | 86              |
    | 87              |
    | 88              |
    | 89              |
    | 90              |
    | 91              |
    | 92              |
    | 93              |
    | 94              |
    | 95              |
    | 96              |
    | 97              |
    | 98              |
    | 99              |
    | 100             |

 Scenario: Insert an excessively long input
    When I enter a value with 1000 characters into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario Outline: Insert a decimals value
    When I enter <decimals> into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message
    Examples:
    |decimals|
    |10.2|
    |10.20|
    |50.5|
    |60.355|

  Scenario Outline: Insert a valid value with leading zeros
    When I enter <value_leading_zeros> into the "tentacles" input field
    And I click the "Send" button
    Then I should see a "Success" message

    Examples:
    |value_leading_zeros|
    |012|
    |0015|
    |050|
    |0056|

  Scenario: Insert a value below the minimum
    When I enter 9 into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario: Insert a value above the maximum
    When I enter 101 into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario: Insert a negative value
    When I enter -10 into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario: Submit an empty input field
    When I leave the "tentacles" input field empty
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario: Insert a non-numeric value
    When I enter Fran into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

  Scenario Outline: Insert special characters
    When I enter <special_characters> into the "tentacles" input field
    And I click the "Send" button
    Then I should see an "Error" message

    Examples:
    |special_characters|
    |/*|
    |"·!@"|
    |$&|
    |=#|







 
