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
			                    <input type="text" class="rc_form__input" name="first_name" placeholder="First Name" data-message="Please enter your first name" required>
		                	</div>
		            		<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
		                		<label>Last Name</label>
			                    <input type="text" class="rc_form__input" name="last_name" placeholder="Last Name" data-message="Please enter your last name" required>
		               		</div>
		                </div>
		                <div class="rc_layout">
		            		<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
			                	<label>Email Address</label>
			                    <input type="email" class="rc_form__input" name="email" placeholder="email.address@something.com" data-message="Please enter your email address" data-regex="/.+@.+\..+/i" required>
		                	</div>
		            		<div class="rc_layout__xs__12 rc_layout__md__6 rc_layout__lg__6">
			                	<label>Website Address</label>
		                    	<input type="text" class="rc_form__input" name="website" placeholder="http://" data-message="Please enter the url of your website" required>
							</div>
		                </div>			
		            	<label>PayPal Address</label>
		                <input type="text" class="rc_form__input" name="paypal_address" placeholder="Which address should we send your rewards to?" data-message="Please enter your PayPal Address" required>
						<label>Include Shopify URL that currently has ReCharge installed:</label>
		                <input type="text" class="rc_form__input" name="storeUrl" placeholder="Store URL" data-message="Please enter the store URL where you have ReCharge installed" required>
		            	<label>Does your client already offer subscriptions?</label>
		            	<div class="rc_form_radio_group">
		                	<input type="radio" name="offer_subscriptions" class="rc_form__input" value="yes" checked>Yes
		                	<input type="radio" name="offer_subscriptions" class="rc_form__input" value="no">No
		                </div>
	                </fieldset>
	            </form>
	            <button id="submit-button" class="rc_button bg_rc_magenta button-become-partner">Submit</button>       
			</div>
		</div>


	</div>
	<div class="rc_sg_section form-elements_section">
		<h3>Radio buttons & checkboxes</h3>
		<p>Radio buttons and checkboxes should inherit the same styles as the ReCharge app.</p>
	</div>
	<div class="rc_sg_section form-elements_section">
		<h3>Dropdowns</h3>
		<p>Dropdowns should inherit the same styles as the ReCharge app. Notice the inactive and active states.</p>
	</div>
</div>

<?php include('templates/static/footer.php'); ?>