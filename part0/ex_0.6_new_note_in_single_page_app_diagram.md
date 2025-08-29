This diagram describes what happens when an user goes to
https://studies.cs.helsinki.fi/exampleapp/spa and creates a new note by writing
"hola fulstackopen!!" into the text field and clicking the Save button.

```mermaid
sequenceDiagram
	participant browser
    participant server
			
	note over browser: The user opens the webpage <br>https://studies.cs.helsinki.fi/exampleapp/spa
	
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
		
	activate server
	
	server-->>browser: spa.html
	
	deactivate server
		
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
		
	activate server
	
	server-->>browser: main.css
	
	deactivate server
	
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js

	activate server
	
	server-->>browser: spa.js
	
	deactivate server
		
	note over browser: The browser executes the code inside<br> spa.js, because of that requests the<br> json file from the server
	
	browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
		
	activate server 
	
	server-->browser: data.json
	
	deactivate server
		
	note over browser: The browser renders the note list<br> on the page according to the information<br> contained in data.json
    
	note over browser: The user creates the new note on the page:<br><br>(1) The java script code in the file 'spa.js' fetchs<br> the new note submitted (preventing the default<br> handling of form's submit).<br><br>(2) The spa.js script code creates a new note <br>from the note submitted, adds it to the note<br> list and rerenders the note list on the page.<br><br>(3) After that, sends the new note to the server.
	
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
	note over browser, server: (The POST request contains the new note as JSON<br> data containing the content of the note and the timestamp:<br> '{"content":"hola fullstackopen!!","date":"2023-12-14T20:35:46.087Z"}')
	
	activate server
	
	note over server: the server appends the data submitted<br> to a json file that contains all the notes<br> submitted by users. Then responds with<br> a status code 201 created.
	
	server-->>browser: HTTP Status Code 201 Created
    note over server, browser: (Status Code 201 Created means that the request<br> was successful and the new note was created and added to the json file).
	deactivate server
	
	note over browser: Browser doesn't reload the page.
```
