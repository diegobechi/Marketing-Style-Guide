
<div id="navbar" class="rc_navbar__container">
	<div class="rc_navbar">
		<a href="/" class="rc_navbar__logo"><img src="/assets/images/layout/recharge-logo.svg" width="164" height="42" alt="ReCharge logo"></a>
		<button class="rc_navbar__toggle rc_button rc_visible--xs rc_visible--sm rc_visible--md" data-toggle="collapse" data-target="#navbar__menu" aria-expanded="true"></button>
		<ul id="navbar__menu" class="rc_navbar__links collapse">
			<li>
				<div class="rc_dropdown">
					<button class="rc_button rc_dropdown__toggle" data-toggle="dropdown">Product</button>
					<div class="rc_dropdown__menu" id="dropdown_product">
						<a href="/features" class="rc_item<?php if ($the_active_page == 'features'){ echo ' rc_active'; } ?>">Features</a>
						<a href="/integrations" class="rc_item<?php if ($the_active_page == 'integrations'){ echo ' rc_active'; } ?>">Integrations</a>
						<a href="/pricing" class="rc_item<?php if ($the_active_page == 'pricing'){ echo ' rc_active'; } ?>">Pricing</a>
					</div>
				</div>
			</li>
			<li>
				<div class="rc_dropdown">
					<button class="rc_button rc_dropdown__toggle" data-toggle="dropdown">Resources</button>
					<div class="rc_dropdown__menu" id="dropdown_resources">
						<a href="http://recharge.helpscoutdocs.com" target="_blank" class="rc_item<?php if ($the_active_page == 'faq'){ echo ' rc_active'; } ?>">Knowledge Base</a>
						<a href="/support-hours" class="rc_item<?php if ($the_active_page == 'support-hours'){ echo ' rc_active'; } ?>">Support Hours</a>
						<a href="/case-studies" class="rc_item<?php if ($the_active_page == 'case-studies'){ echo ' rc_active'; } ?>">Case Studies</a>
						<a href="/experts" class="rc_item<?php if ($the_active_page == 'experts'){ echo ' rc_active'; } ?>">Experts</a>
						<a href="/migrations" class="rc_item<?php if ($the_active_page == 'migrations'){ echo ' rc_active'; } ?>">Migrations</a>
					</div>
				</div>
			</li>
			<li>
				<a href="/enterprise" class="<?php if ($the_active_page == 'pro'){ echo ' rc_active'; } ?>">Enterprise</a>
			</li>
			<li>
				<a href="/api" class="<?php if ($the_active_page == 'api'){ echo ' rc_active'; } ?>">Developers</a>
			</li>
		</ul>
		<a href="https://apps.shopify.com/shopify-recurring-payments" class="rc_button rc_button_small rc_button_secondary rc_hidden--xs rc_hidden--sm rc_hidden--md" id="navbarSignUp">Sign Up Free</a>
	</div>
</div>