import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { useState } from 'react'

export default function Combobox ({ items, placeholder = 'Seleccione una opción', empy = 'No se encontraron resultados', className }) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('cualquiera')

	return (
		<Popover open={open} onOpenChange={setOpen} required>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={`w-[240px] justify-between dark:bg-gray-800 h-full text-base ${className}`}
				>
					{value ? items.find((item) => item.key.toLowerCase() === value)?.value : placeholder}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[250px] p-0 text-base'>
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>{empy}</CommandEmpty>
					<CommandGroup className='max-h-56 overflow-auto'>
						{items.map((item, i) => (
							<CommandItem
								key={item.id}
								value={item.key}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? '' : currentValue)
									setOpen(false)
								}}
								defaultSelected={value === item.value}
								className={`text-[15px] ${i === 1 ? 'border-b-[1px] border-gray-300 pb-3' : ''} ${i === 2 ? 'pt-3' : ''}`}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value === item.value ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{item.value}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
