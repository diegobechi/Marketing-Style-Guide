<?php
	$page_title = 'Google Analytics | Integrations';
	$page_description = '';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__google-analytics';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/google-analytics_logo.png" alt="Google Analytics logo" class="integration__details__logo">
		</div><!-- .rc_layout__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Google Analytics</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://www.google.com/analytics" target="_blank" class="rc_link integration__website">www.google.com/analytics</a></p>
					<p>Optimize all parts of the sales funnel with Google Analytics. Improve performance across your sites, apps, and offline marketing. Google's analytics solutions can help you turn customer insights into action for your business.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Track page views.</li>
					<li class="rc_tick_ok">Optimize where in the funnel subscribers drop off.</li>
				</ul><!-- .integration__features -->
			</div><!-- .integration__details -->
		</div><!-- .rc_layout__sm__8 -->
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