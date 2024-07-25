import '../styles/Sidebar.sass'
import * as Icon from 'react-bootstrap-icons';
import ActivityLogs from './ActivityLogsDrawer';

import { Switch } from "./ui/switch"
import { useTheme } from "./context-providers/sidebar-theme"
import { useAdditionalOptions } from './context-providers/sidebar-additional-options';
import { Drawer, DrawerTrigger } from "./ui/drawer"
import { socket } from '../utils/socket';
import { cn } from '../lib/utils';
import { useOptions } from './context-providers/options';

export default function Sidebar() {
    const { theme, setTheme } = useTheme();
    const { options, setOptions } = useOptions();
    const { additionalOption, setAdditionalOption } = useAdditionalOptions();

    function saveOption(key: string, checked: boolean) {
        // Emit the option change
        socket.emit('option-update', key, checked);
        // Update the option
        setOptions({ ...options, [key]: checked });
        // Refetch options from server to make sure updates still properly reflected
        setTimeout(() =>
            fetch('/api/options.json')
                .then(res => res.json())
                .then(res => setOptions({
                    ...options,
                    ...res,
                    shape: { ...res.shape, ...options.shape },
                    schedule: { ...res.schedule, ...options.schedule },
                })), 1500);
    }

    // Sidebar is hidden
    if (additionalOption.hideSidebar)
        return (
            <aside className='min-w-0 p-0 m-0 w-0 mr-[20px] t2'>
                <div className='side-toggle visible grid place-content-center text-[25px] left-[16px]'>
                    <Icon.ArrowRightShort onClick={() => setAdditionalOption({ ...additionalOption, hideSidebar: !additionalOption.hideSidebar })} />
                </div>
            </aside>
        )

    return (
        <aside className='group/menu filled t2'>
            <div className='side-toggle group-hover/menu:visible invisible grid place-content-center text-[25px] z-[1] fixed t2'>
                <Icon.ArrowLeftShort onClick={() => setAdditionalOption({ ...additionalOption, hideSidebar: !additionalOption.hideSidebar })} />
            </div>
            <div className='flex flex-col justify-between h-full gap-[5%]'>
                <div>
                    <section className="options">
                        <section>
                            <h1 className='!mt-0'>General options</h1>
                            <div className='content'>
                                <div className="item">
                                    <p>Dark theme</p>
                                    <Switch checked={theme === 'dark'} onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')} />
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="options multiple">
                        <section>
                            <h1>Camera options</h1>
                            <div className='content'>
                                <div className="item">
                                    <p>Flip upside down</p>
                                    <Switch checked={options.fliporientation} onCheckedChange={checked => saveOption('fliporientation', checked)} />
                                </div>
                                <div className="item">
                                    <p>24/7 recording</p>
                                    <Switch checked={options.recording247} onCheckedChange={checked => saveOption('recording247', checked)} />
                                </div>
                                <div className="item">
                                    <p>Motion detection</p>
                                    <Switch checked={options.motiondetection} onCheckedChange={checked => saveOption('motiondetection', checked)} />
                                </div>
                                <div className="item">
                                    <p>Activity logs</p>
                                    <Switch checked={options.logging} onCheckedChange={checked => saveOption('logging', checked)} />
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="options no-bg">
                        <section>
                            <h1>Additional options</h1>
                            <div className='content !pb-0'>
                                <div className={cn('item', 'group/item', additionalOption.recordings ? 'active' : '')} onClick={() => setAdditionalOption({ recordings: true })}>
                                    <p>View recordings</p>
                                    <Icon.ArrowRight className='translate-x-[10px] icon text-[16px] translate-y-[4px] group-hover/item:translate-x-[15px]' />
                                </div>
                                <div className={cn('item', 'group/item', additionalOption.zones ? 'active' : '')} onClick={() => setAdditionalOption({ zones: true })}>
                                    <p>Privacy zones</p>
                                    <Icon.ArrowRight className='translate-x-[10px] icon text-[16px] translate-y-[4px] group-hover/item:translate-x-[15px]' />
                                </div>
                                <div className={cn('item', 'group/item', additionalOption.scheduleRecordings ? 'active' : '')} onClick={() => setAdditionalOption({ scheduleRecordings: true })}>
                                    <p>Schedule recording</p>
                                    <Icon.ArrowRight className='translate-x-[10px] icon text-[16px] translate-y-[4px] group-hover/item:translate-x-[15px]' />
                                </div>
                                <div className={cn('item', 'group/item', additionalOption.moreOptions ? 'active' : '')} onClick={() => setAdditionalOption({ moreOptions: true })}>
                                    <p>More options</p>
                                    <Icon.ArrowRight className='translate-x-[10px] icon text-[16px] translate-y-[4px] group-hover/item:translate-x-[15px]' />
                                </div>
                            </div>
                        </section>
                    </section>
                </div>

                <section className="options last cursor-pointer mt-2">
                    <section className="mb-[5%]">
                        <div className='content'>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <div className="item">
                                        <p className='translate-x-[-5px]'>Activity logs</p>
                                        <svg className='icon text-[16px] translate-y-[3px] group-hover:translate-x-[15px] fill-current' xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 18 18">
                                            <path d="M16.6 0H3.4A1.391 1.391 0 0 0 2 1.4V3H1a1 1 0 1 0 0 2h1v3H1a1 1 0 1 0 0 2h1v3H1a1 1 0 0 0 0 2h1v1.54A1.444 1.444 0 0 0 3.4 18h13.2a1.444 1.444 0 0 0 1.4-1.46V1.43A1.417 1.417 0 0 0 16.6 0zM4.5 15.5a1.48 1.48 0 0 1-1.16-.56 1 1 0 0 0 0-1.88 1.48 1.48 0 0 1 1.16-.56 1.5 1.5 0 0 1 0 3zm0-5a1.48 1.48 0 0 1-1.16-.56 1 1 0 0 0 0-1.88A1.48 1.48 0 0 1 4.5 7.5a1.5 1.5 0 0 1 0 3zm0-5a1.48 1.48 0 0 1-1.16-.56 1 1 0 0 0 0-1.88A1.48 1.48 0 0 1 4.5 2.5a1.5 1.5 0 0 1 0 3zM12 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm.977-3.783a1 1 0 0 1-1.953 0l-2-9A1 1 0 0 1 10 2h4a1 1 0 0 1 .977 1.217l-2 9z" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                </DrawerTrigger>
                                <ActivityLogs />
                            </Drawer>
                        </div>
                    </section>
                </section>
            </div>
        </aside>
    )
}
