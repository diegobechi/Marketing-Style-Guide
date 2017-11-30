<?php
	$page_title = 'Klaviyo | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, klaviyo';
	$page_class = 'integration__details';
	$page_active = 'integration__klaviyo';
?>
<?php include('../templates/static/header.php'); ?>

<div class="page__container">

	<div class="rc_layout__container">
		<div class="rc_layout">
			<div class="rc_layout__sm__4">
				<img src="/assets/images/integrations/klaviyo_logo.png" alt="Klaviyo logo" class="integration__details__logo">
			</div><!-- .grid__sm__4 -->
			<div class="rc_layout__sm__8">
				<div class="integration__details">
					<div class="integration__header">
						<h1 class="integration__title">Klaviyo</h1>
					</div><!-- .integration__header -->
					<div class="integration__info">
						<p><a href="https://www.klaviyo.com/" target="_blank" class="integration__website">www.klaviyo.com</a></p>
						<p>Klaviyo helps you drive sales by using data from Shopify and other apps like ReCharge to send automated emails, create personalized product recommendations, deliver post-purchase engagement campaigns, run better Facebook ads and more. It's data-driven marketing, made simple.</p>
					</div><!-- .integration__info -->
					<h5>Supported features</h5>
					<ul class="integration__features rc_list_items">
						<li class="rc_tick_ok">Get started in minutes with 1-click integrations and pre-designed, responsive templates for newsletters and automated flows.</li>
						<li class="rc_tick_ok">Win back lost sales with automated abandoned cart emails.</li>
						<li class="rc_tick_ok">Send more relevant email with segments that update automatically, in real-time.</li>
						<li class="rc_tick_ok">Sync your Klaviyo segments with Facebook Custom Audiences to find new customers or win back lost customers.</li>
					</ul><!-- .integration__features -->
				</div><!-- .integration__details -->
			</div><!-- .grid__sm__8 -->
		</div><!-- .layout -->
	</div><!-- .container -->

</div><!-- .page__container -->

<div class="integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../includes/footer.php'); ?>