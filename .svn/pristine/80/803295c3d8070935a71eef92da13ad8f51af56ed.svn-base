/**
 * Autoform
 * 
 * 
 * @copyright	Copyright 2013 authors
 * @license		MIT License (see LICENSE.txt)
 * 
 */
 
/**
 * File: autoform/public/autoform.js
 * 
 * Autoform main client component.
 * 
 */

// TODO: Add check for notmodified error
 
// Define the form messages
	var formMessages = {
		'en': {
			'broken': 'Form fields have no name attributes or form action or method attributes are undefined.', 
			'missing': 'The form was not sent because required information was missing. Please fill in all required fields.', 
			'timeout': 'Could not connect to the server. Please check your internet connection and try again.', 
			'abort': 'The connection to the server was aborted. Please check your internet connection and try again.', 
			'parsererror': 'Could not understand the response from the server.'
		}, 
		'fi': {
			'broken': 'Lomakkeessa ei ole name-attribuutilla varustettuja kenttiä tai lomakkeen action- tai method-attribuutit ovat määrittämättä.', 
			'missing': 'Lomaketta ei lähetetty, koska pakollisia tietoja puuttui. Ole hyvä ja täytä kaikki pakolliset kentät.', 
			'timeout': 'Palvelimeen ei saatu yhteyttä. Ole hyvä ja tarkista internet-yhteytesi.', 
			'abort': 'Yhteys palvelimeen katkaistiin. Ole hyvä ja tarkista internet-yhteytesi.', 
			'parsererror': 'Palvelimen vastaus ei ollut ymmärrettävä.'
		}
	};

// Define the form language
	var formLang = $('html').attr('lang');
	// If form language and form messages are defined, use this language, if not, use English
	formLang = (formLang && typeof formMessages[formLang] !== 'undefined') ? formLang : 'en';

// Handles success and error messages from server
			function autoform_result_handler(form, response) {
				// Chose all .system-message elements
				$systemMessages = $('[id^="system-messages-"]');
				$systemMessage = $systemMessages.children();
				// If there is no such an element, create a new one
				if ($systemMessage.length == 0) {
					$systemMessage = $('<div class="system-message"></div>').appendTo($systemMessages);
				}
				$systemMessage.hide();
				// Add the class [status] to the element
				// TODO
				if (response['status'] === undefined) {
					// Use parse error status if there wasn't any status in the response
					response['status'] = 'parsererror';
					response['message'] = formMessages[formLang]['parsererror'];
				}
				// TODO
				if (response['status'] == 'notice' || response['status'] == 'empty' || response['status'] == 'missing') {
					$systemMessage.addClass('system-message-notice');
				}
				else if (response['status'] == 'success') {
					$systemMessage.addClass('system-message-success');
				}
				else {
					$systemMessage.addClass('system-message-failure');
					response['message'] = formMessages[formLang]['timeout'];
				}
				// Add message to the content of the element
				$systemMessage.text('');
				$systemMessage.text(response['message']);
				$systemMessage.fadeIn();
				
				if ($(document).scrollTop() > $('[id^="system-messages-"]').offset().top) {
					$("html, body").animate({
						scrollTop: $('[id^="system-messages-"]').offset().top
					}, {
						duration: 200,
					});
				}
				// Remove the disable attribute from the button
				if (form) {
					form.find('input[type=submit]').removeAttr("disabled");
				}
			};

// Add a protective wrapper
;(function ($, window, document, undefined) {

	$(document).ready(function() {
		$('form.autoform').live('submit', function(event) {
			var $form = $(this), $fields, labels = {}, required = [], requiredFieldMissing = false;
			
			// Search for input elements
			$fields = $($form.get(0).elements).filter('[name]').not('[name=""]');
			// Exclude the unchecked input data
			$fields = $fields.not('input[type="checkbox"]:not([checked]), input[type="radio"]:not([checked])');
			// Search for labels of the input elements, if they exist
			$fields.each(function(index) {
				var $this = $(this), labelText = '';
				// Get the labels of input elements
				if ($this.attr('data-label')) {
					// Remove unnecessary white spaces
					labelText = $.trim($this.attr('data-label'));
				}
				// If it is not a checkbox or radio button, search for closest label with the same id
				else if (!$this.is('input[type="checkbox"], input[type="radio"]')) {
					$label = $form.find("label[for='" + $this.attr('id') + "']");
					if (!$label.length) {
						$label = $(this).closest("label");
					}
					labelText = $.trim($label.eq(0).text());
				}
				// Remove previously added notification, if required field is filled with data
				$(this).removeClass('warning');
				// Search for required fields within the chosen array
				// || labelText.indexOf("*") !== -1
				if ((typeof $this.attr('data-required') !== 'undefined' && $this.attr('data-required') !== 'false') || $this.hasClass('required')) {
					// Add an attribute to the array
					required.push($this.attr('name'));
					// Checks if required field is filled and show the notification to user
					if ($this.val() == '') {
						$(this).addClass('warning');
						requiredFieldMissing = true;
					}
				}
				// Remove the *-sign from the required field labels
				labelText = $.trim(labelText.replace('*', ''));
				// Rewrite data to array
				labels[$this.attr('name')] = labelText;
			});
			
			// If the required field is missing, show the notification in system-message element
			if (requiredFieldMissing) {
				autoform_result_handler($form, {'status': 'missing', 'message': formMessages[formLang]['missing']});
			} 
			else {
				// Remove previously added notifications
				$fields.removeClass('notification');
				// Find the form action and method attributes
				var formAction = $form.attr('action'),
					formMethod = $form.attr('method');
				// Serialize the data and check the action and method attributes
				serializedData = $form.serialize();
				if (serializedData && formAction && formMethod) {
					// Serialize the labels
					labels = $.param({'labels': labels});
					if (labels) {
						serializedData += '&' + labels;
					}
					// Serialize the required fields
					required = $.param({'required': required});
					if (required) {
						 serializedData += '&' + required;
					}
					// Add the response mode and language to the serialized data
					serializedData += '&response_mode=json&response_lang=fi';
					//console.log("Data:", serializedData);
					// Disable the form while it is being sent
					$form.find('input[type=submit]').attr("disabled", "disabled");
					// Remove the previous status from the message
					$systemMessages = $('[id^="system-messages-"]');
					$systemMessages.empty();
					//$systemMessage.hide();
					//$systemMessage.removeClass('system-message-success system-message-notice system-message-failure');
					// Send the form data
					if ($form.attr('enctype') == 'multipart/form-data') {
						$.ajax({
							url: formAction, 
							type: formMethod, 
							data: new FormData(this), 
							datatype: "json", 
							cache: false, 
							timeout: 60000, 
							processData: false,
							contentType: false,
							success: function(response, textStatus, jqXHR) {
								//console.log("Response:", response);
								autoform_result_handler($form, response);
								if (typeof window['autoform_complete'] == 'function') {
									autoform_complete(response);
								}
							},
							error: function (jqXHR, textStatus, errorThrown) {
								//console.log("Response:", textStatus);
								autoform_result_handler($form, {'status': 'failure', 'message': formMessages[formLang][textStatus]});
							},
							complete: function() {
								$form.find('input[type=submit]').removeAttr("disabled");
							}
						});
					} else {
					$.ajax({
						url: formAction, 
						type: formMethod, 
						data: serializedData, 
						datatype: "json", 
						cache: false, 
						timeout: 20000, 
						success: function(response, textStatus, jqXHR) {
							//console.log("Response:", response);
							autoform_result_handler($form, response);
							if (typeof window['autoform_complete'] == 'function') {
								autoform_complete(response);
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							//console.log("Response:", textStatus);
							autoform_result_handler($form, {'status': 'failure', 'message': formMessages[formLang][textStatus]});
						},
						complete: function() {
							$form.find('input[type=submit]').removeAttr("disabled");
						}
					});
					}
				}
				else {
					autoform_result_handler($form, {'status': 'failure', 'message': formMessages[formLang]['broken']});
				}
			}
			event.preventDefault();
			return false;
		});
	});
})(jQuery, window, document);