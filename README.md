# Dynamic Link Handler

Todo:
- [ ] Add option for custom js alerts
- [ ] Add option for custom modal confirm

Attributes:
* data-link = link to resource (use link handler on this element)
* data-ajax = true (send href as ajax request)
* data-confirm = true/msg (if true show default msg, else show data-confirm="msg contents")
* data-toggle = elementID (Disable caller element and show elementID. Usable with data-ajax requests to switch button content)

Default Options:
* onStart: function(){}
* onEnd: function(){}
* AjaxResponseDelimiter: '!'

Examples:
```javascript
$('[data-link]').LinkHandler(); (recommended)
$('a, button').LinkHandler();
$('.customlink').LinkHandler();
$('[data-link]').LinkHandler({
  AjaxResponseDelimiter: ':',
  onStart: function(){ $('.loading').show(); },
  onEnd: function(){ $('.loading').hide(); }
});
```
```html
<button type="button" data-link="some.php?delete=someid" data-confirm='Are you sure you want to delete this item?'>delete</button>
<button type='button'
				data-link='some.php'
				data-ajax='true'
				data-confirm='Are you sure?'
				data-toggle='new_btn_element'
>GO!</button>
```
Full example (using all the features):
```html
<button type="button"
				data-link="system.php?disable=this"
				data-confirm="Are you sure you want to disable this?"
				data-ajax="true"
				data-toggle="enable_button"
				id="disable_button">Set off</button>
<button type="button"
				data-link="system.php?enable=this"
				data-ajax="true"
				data-toggle="disable_button"
				id="enable_button">Set on</button>
```

Note: Responses from the server are shown using the alertify js plugin.

The `AjaxResponseDelimiter` is used to separate the server response type from message. 
Example server response status types are **success** and **error**.


Example server response: **error! Invalid item ID!** will give 
```javascript
alertify.error('Invalid item ID!');
```

Example server response: **success! You have successfuly deleted item!** will give 
```javascript
alertify.success('You have successfuly deleted item!');
```

Example server response: **Some message without response status type** will give 
```javascript
alertify.success('Some message without response status type');
```
