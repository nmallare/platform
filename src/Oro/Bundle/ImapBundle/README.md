OroImapBundle
=============

This bundle provides a functionality to work with email servers through IMAP protocol.

Dependencies
------------

"zendframework/zend-mail": "2.1.5"

Notes:
- We cannot use more recent version of zend-mail because *besimple/soap* uses it as well and requires 2.1.* version.
- Also we have to use version 2.1.5 due an issue with *binary* content transfer encoding in version 2.1.6.


Usage
-----

``` php
<?php
    // Preparing connection config
    $imapConfig = new ImapConfig('imap.gmail.com', 993, 'ssl', 'user', 'pwd');

    // Accessing IMAP connector factory
    /** @var $factory \Oro\Bundle\ImapBundle\Connector\ImapConnectorFactory */
    $factory = $this->get('oro_imap.connector.factory');

    // Creating IMAP connector for the ORO user
    /** @var $imap \Oro\Bundle\ImapBundle\Connector\ImapConnector */
    $imapConnector = $factory->createImapConnector($imapConfig);

    // Creating IMAP manager
    $imapManager = new ImapEmailManager($imapConnector);

    // Creating the search query builder
    /** @var $queryBuilder \Oro\Bundle\ImapBundle\Connector\Search\SearchQueryBuilder */
    $queryBuilder = $imapManager->getSearchQueryBuilder();

    // Building a search query
    $query = $queryBuilder
        ->from('test@test.com')
        ->subject('notification')
        ->get();

    // Request an IMAP server for find emails
    $imapManager->selectFolder('INBOX');
    $emails = $imapManager->findItems($query);
```

Synchronization with IMAP servers
---------------------------------
Each user who want to synchronize own emails with BAP need to configure own IMAP mailbox on the user details page. He/she just need to enter correct host, port, security type and credentials.
During the synchronization we load emails from user's inbox and outbox by the following algorithm:

 - If a user's mailbox is newer synchronized yet then we load emails for the last year only.
 - We load only emails related to BAP users/contacts only. It means that we load only emails sent to/from email addresses assigned to any user/contact.


By default the synchronization is executed by CRON every 30 minutes. Also you can execute it manually using the following command:
```bash
php app/console oro:cron:imap-sync
```

Email synchronization functionality is implemented in the following classes:

 - ImapEmailSynchronizer - extends OroEmailBundle\Sync\AbstractEmailSynchronizer class to work with IMAP mailboxes.
 - ImapEmailSynchronizationProcessor - implements email synchronization algorithm used for synchronize emails through IMAP.
 - EmailSyncCommand - allows to execute email synchronization as CRON job or through command line.
