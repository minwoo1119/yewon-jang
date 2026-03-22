create table if not exists public.portfolio_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_portfolio_content_updated_at on public.portfolio_content;

create trigger set_portfolio_content_updated_at
before update on public.portfolio_content
for each row
execute procedure public.set_current_timestamp_updated_at();

insert into public.portfolio_content (id, content)
values ('singleton', '{}'::jsonb)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;
