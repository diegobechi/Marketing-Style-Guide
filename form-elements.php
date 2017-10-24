<?php include('templates/static/header.php'); ?>
<div>
	<div class="rc_sg_page_header">
		<h2>Form elements</h2>
		<p>Forms aren’t super prevalent on the marketing website, but they follow the same styles as the app for the most part.</p>
	</div>
	<div class="rc_sg_section form-elements_section">
		<h3>Example form</h3>
		<p>Forms on the marketing website should inherit a lot of the styles from the product forms, including font sizes and padding. Our marketing form fields should be full-width by default, however we should feel free to bump form fields up next to each other when applicable. Forms can live on multiple backgrounds, such as white with a box shadow, white without a shadow, and on dark backgrounds.</p>

		<div class="rc_form rc_shadow_level5" id="rc_become_a_partner">
			<div class="rc_form_container" id="">
				<form method="post" id="contact-form" target="_blank" class="">
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
		            	<label>PayPal Address</label>
		                <input type="text" class="rc_form_input" name="paypal_address" placeholder="Which address should we send your rewards to?" data-message="Please enter your PayPal Address" required>
						<label>Include Shopify URL that currently has ReCharge installed:</label>
		                <input type="text" class="rc_form_input" name="storeUrl" placeholder="Store URL" data-message="Please enter the store URL where you have ReCharge installed" required>
		            	<label>Does your client already offer subscriptions?</label>
		            	<div class="rc_form_radio_group">
		                	<input type="radio" name="offer_subscriptions" class="rc_form_input" value="yes" checked>Yes
		                	<input type="radio" name="offer_subscriptions" class="rc_form_input" value="no">No
		                </div>
	                </fieldset>
	            </form>
	            <button id="submit-button" class="rc_button rc_button_primary button-become-partner">Submit</button>       
			</div>
		</div>


	</div>
	<div class="rc_sg_section form-elements_section">
		<h3>Radio buttons & checkboxes</h3>
		<p>Radio buttons and checkboxes should inherit the same styles as the ReCharge app.</p>
		<div>
			<div>
				<div>
					<div>
						<input type="checkbox">
						<input type="checkbox">
						<input type="checkbox">
						<input type="checkbox">
					</div>
					<div>
						<input type="radio">
						<input type="radio">
						<input type="radio">
					</div>
					<div>
						<input type="checkbox"><label>Checkbox Label</label>
						<input type="radio"><label>Radio Label</label>
					</div>
				</div>
				<div>
					<div>
						<input type="radio">
						<div>
							<label>Radio Label</label>
							<span>Radio option Info</span>
						</div>
					</div>
					<div>
						<input type="checkbox"><label>Checkbox Label</label>
						<input type="checkbox"><label>Checkbox Label</label>
						<input type="checkbox"><label>Checkbox Label</label>
						<input type="checkbox"><label>Checkbox Label</label>
					</div>
				</div>
			</div>
			<div>
				
			</div>
		</div>
	</div>
	<div class="rc_sg_section form-elements_section">
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
				<select class="rc_dropdown rc_dropdown">
					<option value="">999</option>
					<option value="">99</option>
					<option value="">9</option>
				</select>
			</div>
		</div>
	</div>
</div>

<?php include('templates/static/footer.php'); ?>