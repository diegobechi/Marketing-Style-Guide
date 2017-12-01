<?php
	$page_title = 'Swell | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, Checkout Funnel, Product Customizer, Gorgias, Swell';
	$page_class = 'integration__details';
	$page_active = 'integration__swell';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/swell_logo.png" alt="Swell logo" class="integration__details__logo">
		</div><!-- .rc_layout__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Swell</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://apps.shopify.com/swell" target="_blank" class="integration__website rc_link">apps.shopify.com/swell</a></p>
					<p>Swell is pioneering the concept of “incentive marketing” with over 700 global retailers, providing targeted, optimized rewards in exchange for desired behaviors. Swell implements powerful rewards, referral, and affiliate programs for tens of millions of consumers, increasing average LTV and driving incremental revenue thanks to its unique data-driven approach.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Flexible incentives for recurring orders of all kinds</li>
					<li class="rc_tick_ok">Give Referrers credit when their friends make their first purchase via ReCharge</li>
					<li class="rc_tick_ok">Allow customers to redeem their points for subscription products</li>
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

<?php include('../includes/footer.php'); ?>