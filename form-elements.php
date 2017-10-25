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
								<label>First Name</label>
								<input type="text" class="rc_form_input" name="first_name" placeholder="First Name" data-message="Please enter your first name" required>
							</div>
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label>Last Name</label>
								<input type="text" class="rc_form_input" name="last_name" placeholder="Active" data-message="Please enter your last name" required>
							</div>
						</div>
						<div class="rc_layout">
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label>Email Address</label>
								<input type="email" class="rc_form_input" name="email" placeholder="Error field" data-message="Please enter your email address" data-regex="/.+@.+\..+/i" required>
							</div>
							<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
								<label>Website Address</label>
								<input type="text" class="rc_form_input" name="website" placeholder="http://" data-message="Please enter the url of your website" required>
							</div>
						</div>
						<div class="layout">
							<div class="grid__sm__12">
								<label>PayPal Email Address</label>
								<input type="text" class="rc_form_input" name="paypal_address" placeholder="Which email address should we send your rewards to?" data-message="Please enter your PayPal Email Address" data-regex="/.+@.+\..+/i" required>
							</div>
						</div>
						<div class="layout">
							<div class="grid__sm__12">
								<label>Include Shopify URL that currently has ReCharge installed:</label>
								<input type="text" class="rc_form_input" name="storeUrl" placeholder="Store URL" data-message="Please enter the store URL where you have ReCharge installed" required>
							</div>
						</div>
						<label>Does your client already offer subscriptions?</label>
						<div class="rc_form_radio_group">
							<input type="radio" name="offer_subscriptions" class="rc_form_input" id="rc_radio_form_yes" value="yes" checked>
							<label class="form__radio__label" for="rc_radio_form_yes">Yes</label>
							<input type="radio" name="offer_subscriptions" class="rc_form_input" id="rc_radio_form_no" value="no">
							<label class="form__radio__label" for="rc_radio_form_no">No</label>
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
						<input type="checkbox" class="form__checkbox" id="sg_checkbox1">
						<label class="form__checkbox__label" for="sg_checkbox1"></label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox2">
						<label class="form__checkbox__label" for="sg_checkbox2"></label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox3">
						<label class="form__checkbox__label" for="sg_checkbox3"></label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox4">
						<label class="form__checkbox__label" for="sg_checkbox4"></label>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="radio" class="form__radio" id="sg_radio1">
						<label class="form__radio__label" for="sg_radio1"></label>
						<input type="radio" class="form__radio" id="sg_radio2">
						<label class="form__radio__label" for="sg_radio2"></label>
						<input type="radio" class="form__radio" id="sg_radio3">
						<label class="form__radio__label" for="sg_radio3"></label>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="checkbox" class="form__checkbox" id="sg_checkbox5">
						<label class="form__checkbox__label" for="sg_checkbox5">Checkbox Label</label>
						<input type="radio" class="form__radio" id="sg_radio4">
						<label class="form__radio__label" for="sg_radio4">Radio Label</label>
					</div>
				</div>
				<div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="radio" class="form__radio" id="sg_radio5">
						<div>
							<label class="form__radio__label" for="sg_radio5">Radio Label</label>
							<span>Radio option Info</span>
						</div>
					</div>
					<div class="rc_layout__xs__12 rc_layout__sm__12 rc_layout__md__6 rc_layout__lg__6">
						<input type="checkbox" class="form__checkbox" id="sg_checkbox6">
						<label class="form__checkbox__label" for="sg_checkbox6">Checkbox Label</label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox7">
						<label class="form__checkbox__label" for="sg_checkbox7">Checkbox Label</label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox8">
						<label class="form__checkbox__label" for="sg_checkbox8">Checkbox Label</label>
						<input type="checkbox" class="form__checkbox" id="sg_checkbox9">
						<label class="form__checkbox__label" for="sg_checkbox9">Checkbox Label</label>
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