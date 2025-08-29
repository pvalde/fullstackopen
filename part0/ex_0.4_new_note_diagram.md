The following diagram describes the situation where an user creates a new note
on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing "hola
fulstackopen!!" into the text field and clicking the Save button.

```mermaid
sequenceDiagram
    participant browser
    participant server
	
	browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_notes<br>the data submitted with the form is "note=hola+fullstackopen%21%21"

	activate server
	
	note over server: the server appends the data submitted to a json file<br>that contains all the notes submitted by users.
	
    note over server: The server asks the browser to do a new <br>HTTP GET request to the address<br> https://studies.cs.helsinki.fi/exampleapp/notes

	server-->>browser: HTTP Status Code 302 (the URL Redirect request)
	
	deactivate server
	
    note over browser: The browser executes <br>the redirect instruction

	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
	
	activate server
	
	server-->>browser: notes.html
	
	deactivate server
	
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
	
	activate server
	
	server-->>browser: main.css
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    
	activate server
    
	server-->>browser: main.js
    
	deactivate server
	
	Note over browser: The browser executes the JavaScript code<br>that fetches the JSON from the server

	browser->>server: GET 	https://studies.cs.helsinki.fi/exampleapp/data.json
    
	activate server
    
	server-->>browser: data.json (which now containts the new note)
    
	deactivate server

	Note over browser: The browser renders the notes

```
