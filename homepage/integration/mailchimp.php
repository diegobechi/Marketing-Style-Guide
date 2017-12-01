<?php
	$page_title = 'MailChimp | Integrations';
	$page_description = '';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, Checkout Funnel, Product Customizer, Gorgias, MailChimp';
	$page_class = 'integration__details';
	$page_active = 'integration__mailchimp';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/mailchimp_logo.png" alt="MailChimp logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">MailChimp</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/mailchimp" target="_blank" class="integration__website rc_link">apps.shopify.com/mailchimp</a></p>
					<p>Ability to add a customer to a cancelled list if any of their purchase item statuses are changed to cancelled.</p>
				</div><!-- .integration__info -->					
			</div><!-- .integration__details -->
		</div><!-- .grid__sm__8 -->
	</div><!-- .layout -->
</div><!-- .container -->

<div class="rc_layout__background integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../templates/static/footer.php'); ?>