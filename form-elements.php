<?php include('templates/static/header.php'); ?>

<div>
	<div class="sg_page_header">
		<h2>Form elements</h2>
		<p>Forms aren’t super prevalent on the marketing website, but they follow the same styles as the app for the most part.</p>
	</div>
	<div class="sg_section sg_form-elements_section">
		<h3>Example form</h3>
		<p>Forms on the marketing website should inherit a lot of the styles from the product forms, including font sizes and padding. Our marketing form fields should be full-width by default, however we should feel free to bump form fields up next to each other when applicable. Forms can live on multiple backgrounds, such as white with a box shadow, white without a shadow, and on dark backgrounds.</p>

		<div class="rc_form rc_shadow_level5" id="rc_become_a_partner">
			<div class="rc_form_container">
				<form method="post" id="contact-form" target="_blank">
					<fieldset>
						<div class="rc_layout">
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label for="" class="rc_form__label">First Name</label>
								<input type="text" name="first_name" placeholder="First Name" class="rc_form_input" data-message="Please enter your first name" required>
							</div>
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label for="" class="rc_form__label">Last Name</label>
								<input type="text" name="last_name" placeholder="Active" class="rc_form_input" data-message="Please enter your last name" required>
							</div>
						</div>
						<div class="rc_layout">
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label for="" class="rc_form__label">Email Address</label>
								<input type="email" name="email" placeholder="Error field" class="rc_form_input" data-message="Please enter your email address" data-regex="/.+@.+\..+/i" required>
							</div>
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label for="" class="rc_form__label">Website Address</label>
								<input type="text" name="website" placeholder="http://" class="rc_form_input" data-message="Please enter the url of your website" required>
							</div>
						</div>
						<div class="rc_layout">
							<div class="rc_layout__sm__12">
								<label for="" class="rc_form__label">PayPal Email Address</label>
								<input type="text" name="paypal_address" placeholder="Which email address should we send your rewards to?" class="rc_form_input" data-message="Please enter your PayPal Email Address" data-regex="/.+@.+\..+/i" required>
							</div>
						</div>
						<div class="rc_layout">
							<div class="rc_layout__sm__12">
								<label for="" class="rc_form__label">Include Shopify URL that currently has ReCharge installed:</label>
								<input type="text" name="storeUrl" placeholder="Store URL" class="rc_form_input" data-message="Please enter the store URL where you have ReCharge installed" required>
							</div>
						</div>
						<label>Does your client already offer subscriptions?</label>
						<div class="rc_form_radio_group">
							<input type="radio" name="offer_subscriptions" id="rc_radio_form_yes" value="yes" class="rc_form_input" checked>
							<label for="rc_radio_form_yes" class="rc_form__label">Yes</label>
							<input type="radio" name="offer_subscriptions" id="rc_radio_form_no" value="no" class="rc_form_input">
							<label for="rc_radio_form_no" class="rc_form__label">No</label>
						</div>
					</fieldset>
				</form>
				<button id="submit-button" class="rc_button rc_button_primary button-become-partner">Submit</button>
			</div>
		</div>

	</div>
	<div class="sg_section sg_form-elements_section">
		<h3>Radio buttons &amp; checkboxes</h3>
		<p>Radio buttons and checkboxes should inherit the same styles as the ReCharge app.</p>
		<div>
			<div class="rc_layout">
				<div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="checkbox" id="sg_checkbox1" class="rc_form__checkbox">
						<label for="sg_checkbox1" class="rc_form__checkbox"></label>
						<input type="checkbox" id="sg_checkbox2" class="rc_form__checkbox">
						<label for="sg_checkbox2" class="rc_form__checkbox"></label>
						<input type="checkbox" id="sg_checkbox3" class="rc_form__checkbox">
						<label for="sg_checkbox3" class="rc_form__checkbox"></label>
						<input type="checkbox" id="sg_checkbox4" class="rc_form__checkbox">
						<label for="sg_checkbox4" class="rc_form__checkbox"></label>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="radio" id="sg_radio1" class="rc_form__radio">
						<label for="sg_radio1" class="rc_form__label"></label>
						<input type="radio" id="sg_radio2" class="rc_form__radio">
						<label for="sg_radio2" class="rc_form__label"></label>
						<input type="radio" id="sg_radio3" class="rc_form__radio">
						<label for="sg_radio3" class="rc_form__label"></label>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="checkbox" id="sg_checkbox5" class="rc_form__checkbox">
						<label for="sg_checkbox5" class="rc_form__checkbox">Checkbox Label</label>
						<input type="radio" id="sg_radio4" class="rc_form__radio">
						<label for="sg_radio4" class="rc_form__label">Radio Label</label>
					</div>
				</div>
				<div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="radio" id="sg_radio5" class="rc_form__radio">
						<label for="sg_radio5" class="form__label">Radio Label</label>
						<span>Radio option Info</span>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="checkbox" id="sg_checkbox6" class="rc_form__checkbox">
						<label for="sg_checkbox6" class="rc_form__checkbox">Checkbox Label</label>
						<input type="checkbox" id="sg_checkbox7" class="rc_form__checkbox">
						<label for="sg_checkbox7" class="rc_form__checkbox">Checkbox Label</label>
						<input type="checkbox" id="sg_checkbox8" class="rc_form__checkbox">
						<label for="sg_checkbox8" class="rc_form__checkbox">Checkbox Label</label>
						<input type="checkbox" id="sg_checkbox9" class="rc_form__checkbox">
						<label for="sg_checkbox9" class="rc_form__checkbox">Checkbox Label</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="sg_section sg_form-elements_section">
		<h3>Dropdowns</h3>
		<p>Dropdowns should inherit the same styles as the ReCharge app. Notice the inactive and active states.</p>
		<div>
			<div>
				<select class="rc_dropdown">
					<option value="">Please choose one</option>
					<option value="">Option 1</option>
					<option value="">Option 2</option>
				</select>
			</div>
			<div>
				<select class="rc_dropdown">
					<option>Please choose one</option>
					<option>Option 1</option>
					<option>Option 2</option>
				</select>
			</div>
			<div>
				<select class="rc_dropdown">
					<option value="">999</option>
					<option value="">99</option>
					<option value="">9</option>
				</select>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(function() {
		let jForm = $('#contact-form'),
			submitButton = $('#submit-button');

		submitButton.prop('disabled', true);
		recharge.validations.addValidations(jForm, submitButton);

		submitButton.click(function(e) {
			e.preventDefault();
			rc_submitForm();
		});

		function rc_submitForm(){
			var $form = $('#contact-form');
				serializedData = $form.serialize();
				$inputs = $form.find('input, select, button, textarea');

			$inputs.prop("disabled", true);

			$.ajax({
				url: '/thank-you-template.php',
				type: 'post',
				data: serializedData
			}).done(function (response, textStatus, jqXHR){
				$('.form-page-container').hide();
				$('.thank-you-container').show();
			}).fail(function (jqXHR, textStatus, errorThrown){
				console.error('The following error occurred: '+textStatus, errorThrown);
			}).always(function () {
				$inputs.prop('disabled', false);
			});
		}
	});
</script>

<?php include('templates/static/footer.php'); ?>