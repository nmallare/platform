<?php

namespace Oro\Bundle\EntityBundle\Cache;

use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;

use Oro\Bundle\EntityBundle\ORM\EntityAliasResolver;

class EntityAliasCacheWarmer implements CacheWarmerInterface
{
    /** @var EntityAliasResolver */
    private $entityAliasResolver;

    /**
     * @param EntityAliasResolver $entityAliasResolver
     */
    public function __construct(EntityAliasResolver $entityAliasResolver)
    {
        $this->entityAliasResolver = $entityAliasResolver;
    }

    /**
     * {@inheritdoc}
     */
    public function warmUp($cacheDir)
    {
        $this->entityAliasResolver->warmUp($cacheDir);
    }

    /**
     * {@inheritdoc}
     */
    public function isOptional()
    {
        return true;
    }
}
