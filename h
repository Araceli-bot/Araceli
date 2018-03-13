NPM-SCRIPTS(7)                   NPM-SCRIPTS(7)

NNAAMMEE
       nnppmm--ssccrriippttss   -   How  npm  handles  the
       "scripts" field

DDEESSCCRRIIPPTTIIOONN
       npm supports the "scripts"  property  of
       the package.json file, for the following
       scripts:

       · prepublish: Run BEFORE the package  is
         packed  and  published,  as well as on
         local nnppmm iinnssttaallll  without  any  argu‐
         ments. (See below)

       · prepare:  Run  both BEFORE the package
         is packed and published, and on  local
         nnppmm iinnssttaallll without any arguments (See
         below). This is run AFTER  pprreeppuubblliisshh,
         but BEFORE pprreeppuubblliisshhOOnnllyy.

       · prepublishOnly: Run BEFORE the package
         is prepared and packed,  ONLY  on  nnppmm
         ppuubblliisshh. (See below.)

       · prepack:   run  BEFORE  a  tarball  is
         packed (on nnppmm ppaacckk, nnppmm ppuubblliisshh,  and
         when installing git dependencies)

       · postpack:  Run  AFTER  the tarball has
         been generated and moved to its  final
         destination.

       · publish,  postpublish:  Run  AFTER the
         package is published.

       · preinstall: Run BEFORE the package  is
         installed

       · install,  postinstall:  Run  AFTER the
         package is installed.

       · preuninstall,  uninstall:  Run  BEFORE
         the package is uninstalled.

       · postuninstall:  Run  AFTER the package
         is uninstalled.

       · preversion:  Run  BEFORE  bumping  the
         package version.

       · version: Run AFTER bumping the package
         version, but BEFORE commit.

       · postversion:  Run  AFTER  bumping  the
         package version, and AFTER commit.

       · pretest,  test,  posttest:  Run by the
         nnppmm tteesstt command.

       · prestop, stop, poststop:  Run  by  the
         nnppmm ssttoopp command.

       · prestart, start, poststart: Run by the
         nnppmm ssttaarrtt command.

       · prerestart, restart, postrestart:  Run
         by  the nnppmm rreessttaarrtt command. Note: nnppmm
         rreessttaarrtt will run the  stop  and  start
         scripts  if  no rreessttaarrtt script is pro‐
         vided.

       · preshrinkwrap,    shrinkwrap,    post‐
         shrinkwrap:  Run by the nnppmm sshhrriinnkkwwrraapp
         command.

       Additionally, arbitrary scripts  can  be
       executed   by   running  nnppmm  rruunn--ssccrriipptt
       <<ssttaaggee>>.  _P_r_e  and  _p_o_s_t  commands  with
       matching  names will be run for those as
       well (e.g. pprreemmyyssccrriipptt, mmyyssccrriipptt,  ppoosstt‐‐
       mmyyssccrriipptt). Scripts from dependencies can
       be run with `npm explore

       <pkg> -- npm run <stage>`.

PPRREEPPUUBBLLIISSHH AANNDD PPRREEPPAARREE
   DDEEPPRREECCAATTIIOONN NNOOTTEE
       Since nnppmm@@11..11..7711, the npm  CLI  has  run
       the  pprreeppuubblliisshh script for both nnppmm ppuubb‐‐
       lliisshh and nnppmm  iinnssttaallll,  because  it's  a
       convenient  way to prepare a package for
       use (some common use cases are described
       in  the  section  below).   It  has also
       turned out to be, in practice, very con‐
       fusing
       _h_t_t_p_s_:_/_/_g_i_t_h_u_b_._c_o_m_/_n_p_m_/_n_p_m_/_i_s_s_u_e_s_/_1_0_0_7_4.
       As  of  nnppmm@@44..00..00,  a new event has been
       introduced, pprreeppaarree, that preserves this
       existing  behavior. A _n_e_w event, pprreeppuubb‐‐
       lliisshhOOnnllyy has been  added  as  a  transi‐
       tional  strategy to allow users to avoid
       the confusing behavior of  existing  npm
       versions  and  only  run  on nnppmm ppuubblliisshh
       (for instance,  running  the  tests  one
       last  time  to  ensure  they're  in good
       shape).

       See
       https://github.com/npm/npm/issues/10074
       for a much lengthier justification, with
       further reading, for this change.

   UUSSEE CCAASSEESS
       If  you  need  to  perform operations on
       your package before it is used, in a way
       that  is  not dependent on the operating
       system or  architecture  of  the  target
       system,  use  a pprreeppuubblliisshh script.  This
       includes tasks such as:

       · Compiling  CoffeeScript  source   code
         into JavaScript.

       · Creating    minified    versions    of
         JavaScript source code.

       · Fetching remote  resources  that  your
         package will use.

       The  advantage  of doing these things at
       pprreeppuubblliisshh time is that they can be done
       once,  in  a single place, thus reducing
       complexity and  variability.   Addition‐
       ally, this means that:

       · You  can  depend on ccooffffeeee--ssccrriipptt as a
         ddeevvDDeeppeennddeennccyy,  and  thus  your  users
         don't need to have it installed.

       · You don't need to include minifiers in
         your package, reducing  the  size  for
         your users.

       · You  don't  need to rely on your users
         having ccuurrll or wwggeett  or  other  system
         tools on the target machines.

DDEEFFAAUULLTT VVAALLUUEESS
       npm  will  default  some  script  values
       based on package contents.

       · ""ssttaarrtt"":: ""nnooddee sseerrvveerr..jjss"": If there is
         a  sseerrvveerr..jjss  file in the root of your
         package, then  npm  will  default  the
         ssttaarrtt command to nnooddee sseerrvveerr..jjss.

       · ""iinnssttaallll""::   ""nnooddee--ggyypp   rreebbuuiilldd"":  If
         there is a  bbiinnddiinngg..ggyypp  file  in  the
         root  of  your package and you haven't
         defined your own iinnssttaallll or pprreeiinnssttaallll
         scripts,  npm will default the iinnssttaallll
         command to compile using node-gyp.

UUSSEERR
       If npm was invoked with root privileges,
       then  it will change the uid to the user
       account or uid  specified  by  the  uusseerr
       config,  which  defaults to nnoobbooddyy.  Set
       the uunnssaaffee--ppeerrmm flag to run scripts with
       root privileges.

EENNVVIIRROONNMMEENNTT
       Package  scripts  run  in an environment
       where many  pieces  of  information  are
       made  available  regarding  the setup of
       npm  and  the  current  state   of   the
       process.

   ppaatthh
       If  you  depend  on  modules that define
       executable scripts,  like  test  suites,
       then  those executables will be added to
       the PPAATTHH for executing the scripts.  So,
       if your package.json has this:

         { "name" : "foo"
         , "dependencies" : { "bar" : "0.1.x" }
         , "scripts": { "start" : "bar ./test" } }

       then  you could run nnppmm ssttaarrtt to execute
       the bbaarr script, which is  exported  into
       the  nnooddee__mmoodduulleess//..bbiinn  directory on nnppmm
       iinnssttaallll.

   ppaacckkaaggee..jjssoonn vvaarrss
       The package.json fields are tacked  onto
       the   nnppmm__ppaacckkaaggee__   prefix.   So,   for
       instance,  if  you  had   {{""nnaammee""::""ffoooo"",,
       ""vveerrssiioonn""::""11..22..55""}}  in your package.json
       file, then your  package  scripts  would
       have  the  nnppmm__ppaacckkaaggee__nnaammee  environment
       variable set to "foo", and the nnppmm__ppaacckk‐‐
       aaggee__vveerrssiioonn set to "1.2.5"

   ccoonnffiigguurraattiioonn
       Configuration  parameters are put in the
       environment with the nnppmm__ccoonnffiigg__ prefix.
       For instance, you can view the effective
       rroooott config  by  checking  the  nnppmm__ccoonn‐‐
       ffiigg__rroooott environment variable.

   SSppeecciiaall:: ppaacckkaaggee..jjssoonn ccoonnffiigg oobbjjeecctt
       The package.json "config" keys are over‐
       written in the environment if there is a
       config     param     of    <<nnaammee>>[[@@<<vveerr‐‐
       ssiioonn>>]]::<<kkeeyy>>.  For example, if the pack‐
       age.json has this:

         { "name" : "foo"
         , "config" : { "port" : "8080" }
         , "scripts" : { "start" : "node server.js" } }

       and the server.js is this:

         http.createServer(...).listen(process.env.npm_package_config_port)

       then  the user could change the behavior
       by doing:

         npm config set foo:port 80

   ccuurrrreenntt lliiffeeccyyccllee eevveenntt
       Lastly, the nnppmm__lliiffeeccyyccllee__eevveenntt environ‐
       ment  variable is set to whichever stage
       of the cycle is being executed. So,  you
       could have a single script used for dif‐
       ferent  parts  of  the   process   which
       switches  based on what's currently hap‐
       pening.

       Objects  are  flattened  following  this
       format,      so      if      you     had
       {{""ssccrriippttss""::{{""iinnssttaallll""::""ffoooo..jjss""}}}} in your
       package.json, then you'd see this in the
       script:

         process.env.npm_package_scripts_install === "foo.js"

EEXXAAMMPPLLEESS
       For example, if your  package.json  con‐
       tains this:

         { "scripts" :
           { "install" : "scripts/install.js"
           , "postinstall" : "scripts/install.js"
           , "uninstall" : "scripts/uninstall.js"
           }
         }

       then  ssccrriippttss//iinnssttaallll..jjss  will be called
       for the install and post-install  stages
       of   the  lifecycle,  and  ssccrriippttss//uunniinn‐‐
       ssttaallll..jjss will be called when the package
       is          uninstalled.           Since
       ssccrriippttss//iinnssttaallll..jjss is  running  for  two
       different  phases,  it  would be wise in
       this case to  look  at  the  nnppmm__lliiffeeccyy‐‐
       ccllee__eevveenntt environment variable.

       If  you  want to run a make command, you
       can do so.  This works just fine:

         { "scripts" :
           { "preinstall" : "./configure"
           , "install" : "make && make install"
           , "test" : "make test"
           }
         }

EEXXIITTIINNGG
       Scripts are run by passing the line as a
       script argument to sshh.

       If  the  script  exits with a code other
       than  0,  then  this  will   abort   the
       process.

       Note  that these script files don't have
       to be nodejs  or  even  javascript  pro‐
       grams. They just have to be some kind of
       executable file.

HHOOOOKK SSCCRRIIPPTTSS
       If you want to run a specific script  at
       a specific lifecycle event for ALL pack‐
       ages, then you can use a hook script.

       Place an executable  file  at  nnooddee__mmoodd‐‐
       uulleess//..hhooookkss//{{eevveennttnnaammee}},  and  it'll get
       run for all packages when they are going
       through  that point in the package life‐
       cycle for any packages installed in that
       root.

       Hook  scripts  are  run exactly the same
       way as package.json scripts.   That  is,
       they  are  in  a separate child process,
       with the env described above.

BBEESSTT PPRRAACCTTIICCEESS
       · Don't exit with a non-zero error  code
         unless you _r_e_a_l_l_y mean it.  Except for
         uninstall scripts, this will cause the
         npm action to fail, and potentially be
         rolled back.  If the failure is  minor
         or  only  will  prevent  some optional
         features, then  it's  better  to  just
         print a warning and exit successfully.

       · Try  not to use scripts to do what npm
         can do for you.  Read through npm help
         5  ppaacckkaaggee..jjssoonn  to see all the things
         that you can  specify  and  enable  by
         simply  describing your package appro‐
         priately.  In general, this will  lead
         to a more robust and consistent state.

       · Inspect  the env to determine where to
         put  things.   For  instance,  if  the
         nnppmm__ccoonnffiigg__bbiinnrroooott  environment  vari‐
         able is set  to  //hhoommee//uusseerr//bbiinn,  then
         don't  try to install executables into
         //uussrr//llooccaall//bbiinn.  The user probably set
         it up that way for a reason.

       · Don't prefix your script commands with
         "sudo".   If  root   permissions   are
         required  for  some reason, then it'll
         fail with that  error,  and  the  user
         will sudo the npm command in question.

       · Don't use iinnssttaallll. Use a ..ggyypp file for
         compilation, and pprreeppuubblliisshh  for  any‐
         thing  else.  You  should almost never
         have to explicitly set a preinstall or
         install script. If you are doing this,
         please consider if  there  is  another
         option.  The only valid use of iinnssttaallll
         or pprreeiinnssttaallll scripts is for  compila‐
         tion  which must be done on the target
         architecture.

SSEEEE AALLSSOO
       · npm help run-script

       · npm help 5 package.json

       · npm help 7 developers

       · npm help install

                 February 2018   NPM-SCRIPTS(7)
